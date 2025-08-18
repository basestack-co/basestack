// Types
import type { MonitorStatus, MonitorType } from ".prisma/client";
import { createSocket as createDgramSocket } from "node:dgram";
// Utils
import { lookup } from "node:dns/promises";
import { Socket as NetSocket } from "node:net";
import { connect as tlsConnect } from "node:tls";
import { z } from "zod";

export const monitorConfigSchema = z.object({
  url: z.string().url(),
  cron: z.string().min(1).regex(/^(\S+\s+){4}\S+$/, "Invalid cron format"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]),
  headers: z.record(z.string(), z.string()),
  timeout: z.number().min(100).max(300_000), // milliseconds
  expectedStatus: z.number().min(100).max(599),
  body: z.string().optional(),
  keyword: z.string().optional(),
  port: z.number().min(1).max(65535).optional(),
  sslCheckDays: z.number().min(1).max(365).optional(),
  followRedirects: z.boolean().optional(),
  verifySSL: z.boolean().optional(),
  regions: z.array(z.string()).optional(),
  retries: z.number().min(0).max(10).optional(),
  retryDelay: z.number().min(0).max(10000).optional(),
  maxResponseSize: z
    .number()
    .min(1024)
    .max(10 * 1024 * 1024)
    .optional(),
});

export type MonitorConfig = z.infer<typeof monitorConfigSchema>;

export interface MonitorCheck {
  status: MonitorStatus;
  responseTime: number;
  responseSize: number;
  statusCode: number;
  error: string | null;
}

interface HttpError extends Error {
  status?: number;
  code?: string;
  timeout?: boolean;
}

// ============================================================================
//  GENERAL FUNCTIONS
// ============================================================================

const getHostPortFromUrl = (
  url: string,
  overridePort?: number,
): { host: string; port: number; protocol: string } => {
  const u = new URL(url);
  const protocol = u.protocol;
  const host = u.hostname;
  const defaultPort = protocol === "https:" ? 443 : 80;
  const port = overridePort ?? (u.port ? parseInt(u.port, 10) : defaultPort);
  return { host, port, protocol };
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const daysBetween = (from: Date, to: Date) =>
  Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

const extractDomain = (hostname: string): string => {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
};

const isTimeoutError = (error: Error): boolean => {
  return (
    error.name === "AbortError" ||
    error.message.includes("timeout") ||
    (error as HttpError).timeout === true
  );
};

const getStatusFromError = (error: Error): number => {
  const httpError = error as HttpError;

  if (httpError.status) return httpError.status;
  if (httpError.code === "ENOTFOUND") return 0;
  if (httpError.code === "ECONNREFUSED") return 0;
  if (isTimeoutError(error)) return 408;

  return 0;
};

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ["http:", "https:"].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

const validateStatus = (
  actual: number,
  expected: number | number[],
): boolean => {
  return Array.isArray(expected)
    ? expected.includes(actual)
    : actual === expected;
};

const sanitizeHeaders = (headers?: Record<string, string>): HeadersInit => {
  if (!headers) return {};

  const sanitized: Record<string, string> = {};
  const skipHeaders = ["content-length", "host", "connection"];

  for (const [key, value] of Object.entries(headers)) {
    if (!skipHeaders.includes(key.toLowerCase())) {
      sanitized[key] = String(value).trim();
    }
  }

  return sanitized;
};

const readResponseWithKeyword = async (
  response: Response,
  keyword: string,
  maxSize: number,
): Promise<{ found: boolean; size: number }> => {
  const reader = response.body?.getReader();
  if (!reader) return { found: false, size: 0 };

  let text = "";
  let totalSize = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalSize += value.length;
      if (totalSize > maxSize) break;

      const chunk = new TextDecoder().decode(value);
      text += chunk;

      if (text.includes(keyword)) {
        reader.cancel();
        return { found: true, size: totalSize };
      }

      if (text.length > maxSize / 10) {
        text = text.slice(-maxSize / 20);
      }
    }

    return { found: text.includes(keyword), size: totalSize };
  } catch {
    reader.cancel();
    return { found: false, size: totalSize };
  }
};

// ============================================================================
//  HTTP CHECK FUNCTION
// ============================================================================

export const createHttpCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const {
    url,
    method = "GET",
    headers,
    body,
    expectedStatus = 200,
    keyword,
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    maxResponseSize = 10 * 1024 * 1024,
  } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  let attempt = 0;

  while (attempt <= retries) {
    const startTime = performance.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const finalHeaders = new Headers(sanitizeHeaders(headers));
      if (!finalHeaders.has("user-agent")) {
        finalHeaders.set("user-agent", "HTTP-Monitor/1.0");
      }
      if (body && !finalHeaders.has("content-type")) {
        finalHeaders.set("content-type", "application/json");
      }

      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: method !== "GET" && method !== "HEAD" ? body : undefined,
        signal: controller.signal,
        redirect: "follow",
        keepalive: timeout < 30000,
      });

      const responseTime = Math.round(performance.now() - startTime);
      const isStatusValid = validateStatus(response.status, expectedStatus);
      let isUp = isStatusValid;
      let responseSize = 0;

      if (keyword && isUp) {
        const result = await readResponseWithKeyword(
          response,
          keyword,
          maxResponseSize,
        );
        isUp = result.found;
        responseSize = result.size;
      } else if (response.body) {
        const contentLength = response.headers.get("content-length");
        if (contentLength) {
          responseSize = parseInt(contentLength, 10);
        }
      }

      clearTimeout(timeoutId);

      return {
        status: isUp ? "UP" : "DOWN",
        responseTime,
        statusCode: response.status,
        error: isUp
          ? null
          : keyword
            ? `Keyword "${keyword}" not found in response`
            : `Expected status ${Array.isArray(expectedStatus) ? expectedStatus.join(" or ") : expectedStatus}, got ${response.status}`,
        responseSize,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      const responseTime = Math.round(performance.now() - startTime);

      if (attempt < retries && !isTimeoutError(error as Error)) {
        attempt++;
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * attempt),
        );
        continue;
      }

      return {
        status: isTimeoutError(error as Error) ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    statusCode: 0,
    responseSize: 0,
    error: "Unexpected end of retry loop",
  };
};

export const createBatchHttpCheck = async (
  configs: MonitorConfig[],
  options: { concurrency?: number } = {},
): Promise<MonitorCheck[]> => {
  const { concurrency = 10 } = options;

  const executeCheck = async (config: MonitorConfig): Promise<MonitorCheck> => {
    try {
      return await createHttpCheck(config);
    } catch (error) {
      return {
        status: "ERROR",
        responseTime: 0,
        statusCode: 0,
        responseSize: 0,
        error: error instanceof Error ? error.message : "Batch check failed",
      };
    }
  };

  const results: MonitorCheck[] = [];

  for (let i = 0; i < configs.length; i += concurrency) {
    const chunk = configs.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(executeCheck));
    results.push(...chunkResults);
  }

  return results;
};

// ============================================================================
//  PING CHECK FUNCTION
// ============================================================================

export const createPingCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const { url, timeout = 5000, retries = 0, retryDelay = 500, port } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  const { host, port: resolvedPort } = getHostPortFromUrl(url, port);

  let attempt = 0;
  while (attempt <= retries) {
    const start = performance.now();

    try {
      await lookup(host);

      await new Promise<void>((resolve, reject) => {
        const socket = new NetSocket();
        let settled = false;

        const timer = setTimeout(() => {
          settled = true;
          socket.destroy(new Error("timeout"));
        }, timeout);

        socket.once("connect", () => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          socket.end();
          resolve();
        });

        socket.once("error", (err) => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          reject(err);
        });

        socket.connect(resolvedPort, host);
      });

      const responseTime = Math.round(performance.now() - start);
      return {
        status: "UP",
        responseTime,
        responseSize: 0,
        statusCode: 0,
        error: null,
      };
    } catch (error) {
      const responseTime = Math.round(performance.now() - start);
      const timeoutErr = isTimeoutError(error as Error);

      if (attempt < retries && !timeoutErr) {
        attempt++;
        await sleep(retryDelay * attempt);
        continue;
      }

      return {
        status: timeoutErr ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error: error instanceof Error ? error.message : "Ping failed",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    responseSize: 0,
    statusCode: 0,
    error: "Unexpected end of retry loop",
  };
};

// ============================================================================
//  TCP CHECK FUNCTION
// ============================================================================

export const createTcpCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const { url, timeout = 5000, retries = 0, retryDelay = 500, port } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  const { host, port: resolvedPort } = getHostPortFromUrl(url, port);
  if (!resolvedPort) {
    return {
      status: "ERROR",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Port required for TCP check",
    };
  }

  let attempt = 0;
  while (attempt <= retries) {
    const start = performance.now();

    try {
      await new Promise<void>((resolve, reject) => {
        const socket = new NetSocket();
        let settled = false;

        const timer = setTimeout(() => {
          settled = true;
          socket.destroy(new Error("timeout"));
        }, timeout);

        socket.once("connect", () => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          socket.end();
          resolve();
        });

        socket.once("error", (err) => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          reject(err);
        });

        socket.connect(resolvedPort, host);
      });

      const responseTime = Math.round(performance.now() - start);
      return {
        status: "UP",
        responseTime,
        responseSize: 0,
        statusCode: 0,
        error: null,
      };
    } catch (error) {
      const responseTime = Math.round(performance.now() - start);
      const timeoutErr = isTimeoutError(error as Error);

      if (attempt < retries && !timeoutErr) {
        attempt++;
        await sleep(retryDelay * attempt);
        continue;
      }

      return {
        status: timeoutErr ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error: error instanceof Error ? error.message : "TCP check failed",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    responseSize: 0,
    statusCode: 0,
    error: "Unexpected end of retry loop",
  };
};

export const createUdpCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const {
    url,
    timeout = 5000,
    retries = 0,
    retryDelay = 500,
    port,
    body,
  } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  const { host, port: resolvedPort } = getHostPortFromUrl(url, port);
  if (!resolvedPort) {
    return {
      status: "ERROR",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Port required for UDP check",
    };
  }

  let attempt = 0;
  while (attempt <= retries) {
    const start = performance.now();

    try {
      const message = Buffer.from(body ?? "ping");

      const bytes = await new Promise<number>((resolve, reject) => {
        const socket = createDgramSocket("udp4");
        let settled = false;

        const timer = setTimeout(() => {
          if (settled) return;
          settled = true;
          try {
            socket.close();
          } catch {}
          reject(Object.assign(new Error("timeout"), { timeout: true }));
        }, timeout);

        socket.once("message", (msg) => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          try {
            socket.close();
          } catch {}
          resolve(msg.length);
        });

        socket.once("error", (err) => {
          if (settled) return;
          clearTimeout(timer);
          settled = true;
          try {
            socket.close();
          } catch {}
          reject(err);
        });

        socket.send(message, resolvedPort, host, (err) => {
          if (err && !settled) {
            clearTimeout(timer);
            settled = true;
            try {
              socket.close();
            } catch {}
            reject(err);
          }
        });
      });

      const responseTime = Math.round(performance.now() - start);
      return {
        status: "UP",
        responseTime,
        responseSize: bytes,
        statusCode: 0,
        error: null,
      };
    } catch (error) {
      const responseTime = Math.round(performance.now() - start);
      const timeoutErr = isTimeoutError(error as Error);

      if (attempt < retries && !timeoutErr) {
        attempt++;
        await sleep(retryDelay * attempt);
        continue;
      }

      return {
        status: timeoutErr ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error: error instanceof Error ? error.message : "No UDP response",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    responseSize: 0,
    statusCode: 0,
    error: "Unexpected end of retry loop",
  };
};

// ============================================================================
//  SSL CHECK FUNCTION
// ============================================================================

export const createSslCertificateCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const {
    url,
    timeout = 5000,
    retries = 0,
    retryDelay = 500,
    port,
    sslCheckDays = 30,
    verifySSL = true,
  } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  const { host, port: resolvedPort } = getHostPortFromUrl(url, port ?? 443);

  let attempt = 0;
  while (attempt <= retries) {
    const start = performance.now();

    try {
      const result = await new Promise<{ validTo?: string; issuer?: unknown }>(
        (resolve, reject) => {
          const socket = tlsConnect(
            {
              host: host,
              port: resolvedPort,
              servername: host,
              rejectUnauthorized: verifySSL,
              timeout,
            },
            () => {
              try {
                const cert = socket.getPeerCertificate?.();
                socket.end();
                resolve({ validTo: cert?.valid_to, issuer: cert?.issuer });
              } catch (e) {
                socket.end();
                reject(e);
              }
            },
          );

          socket.once("error", (err) => reject(err));
          socket.setTimeout(timeout, () => {
            socket.destroy(new Error("timeout"));
          });
        },
      );

      const responseTime = Math.round(performance.now() - start);
      if (!result.validTo) {
        return {
          status: "ERROR",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: "No certificate presented",
        };
      }

      const expiresAt = new Date(result.validTo);
      const now = new Date();
      const daysLeft = daysBetween(now, expiresAt);

      if (daysLeft <= 0) {
        return {
          status: "DOWN",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: `Certificate expired`,
        };
      }

      if (daysLeft < sslCheckDays) {
        return {
          status: "DEGRADED",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: `Certificate expires in ${daysLeft} day(s)`,
        };
      }

      return {
        status: "UP",
        responseTime,
        responseSize: 0,
        statusCode: 0,
        error: null,
      };
    } catch (error) {
      const responseTime = Math.round(performance.now() - start);
      const timeoutErr = isTimeoutError(error as Error);

      if (attempt < retries && !timeoutErr) {
        attempt++;
        await sleep(retryDelay * attempt);
        continue;
      }

      return {
        status: timeoutErr ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error:
          error instanceof Error
            ? error.message
            : "SSL certificate check failed",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    responseSize: 0,
    statusCode: 0,
    error: "Unexpected end of retry loop",
  };
};

// ============================================================================
//  DOMAIN EXPIRY CHECK FUNCTION
// ============================================================================

export const createDomainExpiryCheck = async (
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  const {
    url,
    timeout = 8000,
    retries = 0,
    retryDelay = 500,
    sslCheckDays = 30,
  } = config;

  if (!isValidUrl(url)) {
    return {
      status: "DOWN",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Invalid URL provided",
    };
  }

  const { host } = getHostPortFromUrl(url);
  const domainCandidates = [host, extractDomain(host)];

  let attempt = 0;
  while (attempt <= retries) {
    const start = performance.now();
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeout);

    try {
      let expiration: Date | null = null;

      for (const candidate of domainCandidates) {
        const res = await fetch(`https://rdap.org/domain/${candidate}`, {
          headers: { accept: "application/rdap+json" },
          signal: controller.signal,
        });

        if (res.ok) {
          const data = await res.json().catch(() => null);
          const events:
            | Array<{ eventAction: string; eventDate: string }>
            | undefined = data?.events;
          const exp = events?.find((e) =>
            e.eventAction?.toLowerCase().includes("expiration"),
          )?.eventDate;
          if (exp) {
            expiration = new Date(exp);
            break;
          }
        }
      }

      clearTimeout(t);

      const responseTime = Math.round(performance.now() - start);

      if (!expiration) {
        return {
          status: "ERROR",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: "Unable to resolve domain expiration via RDAP",
        };
      }

      const now = new Date();
      const daysLeft = daysBetween(now, expiration);

      if (daysLeft <= 0) {
        return {
          status: "DOWN",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: "Domain expired",
        };
      }

      if (daysLeft < sslCheckDays) {
        return {
          status: "DEGRADED",
          responseTime,
          responseSize: 0,
          statusCode: 0,
          error: `Domain expires in ${daysLeft} day(s)`,
        };
      }

      return {
        status: "UP",
        responseTime,
        responseSize: 0,
        statusCode: 0,
        error: null,
      };
    } catch (error) {
      clearTimeout(t);
      const responseTime = Math.round(performance.now() - start);
      const timeoutErr = isTimeoutError(error as Error);

      if (attempt < retries && !timeoutErr) {
        attempt++;
        await sleep(retryDelay * attempt);
        continue;
      }

      return {
        status: timeoutErr ? "TIMEOUT" : "ERROR",
        responseTime,
        responseSize: 0,
        statusCode: getStatusFromError(error as Error),
        error:
          error instanceof Error ? error.message : "Domain expiry check failed",
      };
    }
  }

  return {
    status: "ERROR",
    responseTime: 0,
    responseSize: 0,
    statusCode: 0,
    error: "Unexpected end of retry loop",
  };
};

export const getPerformCheck = async (
  type: MonitorType,
  config: MonitorConfig,
): Promise<MonitorCheck> => {
  if (type === "KEYWORD" && !config.keyword) {
    return {
      status: "ERROR",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: "Keyword monitor requires 'keyword' in config",
    };
  }

  const handlers: Record<
    MonitorType,
    (cfg: MonitorConfig) => Promise<MonitorCheck>
  > = {
    HTTP: createHttpCheck,
    HTTPS: createHttpCheck,
    PING: createPingCheck,
    TCP: createTcpCheck,
    UDP: createUdpCheck,
    SSL_CERTIFICATE: createSslCertificateCheck,
    DOMAIN_EXPIRY: createDomainExpiryCheck,
    CRON_JOB: createHttpCheck, // heartbeat URL
    API_ENDPOINT: createHttpCheck, // generic API endpoint
    KEYWORD: createHttpCheck, // validated above
  };

  const handler = handlers[type];
  if (!handler) {
    return {
      status: "ERROR",
      responseTime: 0,
      responseSize: 0,
      statusCode: 0,
      error: `Unsupported monitor type: ${type}`,
    };
  }

  try {
    return await handler(config);
  } catch (error) {
    return {
      status: isTimeoutError(error as Error) ? "TIMEOUT" : "ERROR",
      responseTime: 0,
      responseSize: 0,
      statusCode: getStatusFromError(error as Error),
      error: error instanceof Error ? error.message : "Monitor check failed",
    };
  }
};
