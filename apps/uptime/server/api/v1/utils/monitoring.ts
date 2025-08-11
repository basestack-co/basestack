// Types
import type { MonitorStatus, MonitorType } from ".prisma/client";
// Utils
import { z } from "zod";

export const monitorConfigSchema = z.object({
  url: z.string().url(),
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

export const getPerformCheck = async (
  type: MonitorType,
  config: MonitorConfig,
) => {
  switch (type) {
    case "HTTPS":
    case "HTTP":
      return await createHttpCheck(config);
    /* case 'PING':
        return await pingCheck(config);
      case 'TCP':
        return await tcpCheck(config);
      case 'SSL_CERTIFICATE':
        return await sslCheck(config); */
  }
};
