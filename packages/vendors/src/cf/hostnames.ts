export const CLOUDFLARE_HOSTNAMES_API_URL = `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/custom_hostnames`;

export interface HostnameClientConfig {
  url?: string;
  metadata?: Record<string, string>;
}

export interface CreateHostnameConfig extends HostnameClientConfig {
  hostname: string;
}

export interface GetHostnameByIdConfig extends HostnameClientConfig {
  hostnameId: string;
}

export interface DeleteHostnameByIdConfig extends HostnameClientConfig {
  hostnameId: string;
}

export interface HostnameResponse {
  id: string;
  status: string;
  verificationErrors: Array<string>;
  ownershipVerification: {
    name: string;
    type: string;
    value: string;
  } | null;
  ownershipVerificationHttp: {
    http_body: string;
    http_url: string;
  } | null;
}

export class CloudflareApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public cloudflareErrors?: Array<{ code: number; message: string }>,
  ) {
    super(message);
    this.name = "CloudflareApiError";
  }
}

const validateEnvironment = () => {
  const required = [
    "CLOUDFLARE_EMAIL",
    "CLOUDFLARE_API_KEY",
    "CLOUDFLARE_ZONE_ID",
  ];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

const getCloudflareCredentials = (() => {
  let validated = false;
  return () => {
    if (!validated) {
      validateEnvironment();
      validated = true;
    }
    return {
      email: process.env.CLOUDFLARE_EMAIL!,
      apiKey: process.env.CLOUDFLARE_API_KEY!,
    };
  };
})();

interface CloudflareApiConfig {
  method: "GET" | "POST" | "DELETE";
  endpoint?: string;
  body?: Record<string, unknown>;
}

const CLOUDFLARE_TIMEOUT = 10000;

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = CLOUDFLARE_TIMEOUT,
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const makeCloudflareRequest = async <T>({
  method,
  endpoint = "",
  body,
  url = CLOUDFLARE_HOSTNAMES_API_URL,
}: CloudflareApiConfig & { url?: string }): Promise<T> => {
  const credentials = getCloudflareCredentials();

  const response = await fetchWithTimeout(`${url}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": credentials.email,
      "X-Auth-Key": credentials.apiKey,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new CloudflareApiError(
      data?.errors?.[0]?.message || "Unknown Cloudflare API error",
      response.status,
      data?.errors,
    );
  }

  return data;
};

interface CloudflareHostnameData {
  id?: string;
  status?: string;
  verification_errors?: Array<string>;
  ownership_verification?: {
    name: string;
    type: string;
    value: string;
  } | null;
  ownership_verification_http?: {
    http_body: string;
    http_url: string;
  } | null;
}

const mapToHostnameResponse = (
  data: CloudflareHostnameData,
): HostnameResponse => ({
  id: data.id ?? "",
  status: data.status ?? "unknown",
  verificationErrors: data.verification_errors ?? [],
  ownershipVerification: data.ownership_verification ?? null,
  ownershipVerificationHttp: data.ownership_verification_http ?? null,
});

export const createCustomHostname = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostname,
  metadata,
}: CreateHostnameConfig): Promise<HostnameResponse> => {
  try {
    const data = await makeCloudflareRequest<CloudflareHostnameData>({
      method: "POST",
      url,
      body: {
        hostname,
        custom_metadata: metadata,
      },
    });

    return mapToHostnameResponse(data);
  } catch (error) {
    if (error instanceof CloudflareApiError || error instanceof Error) {
      throw error;
    }
    console.error("Unexpected error creating custom hostname:", error);
    throw new CloudflareApiError("Failed to create custom hostname");
  }
};

export const getCustomHostnameById = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostnameId,
}: GetHostnameByIdConfig): Promise<HostnameResponse> => {
  try {
    const data = await makeCloudflareRequest<CloudflareHostnameData>({
      method: "GET",
      url,
      endpoint: `/${hostnameId}`,
    });

    return mapToHostnameResponse(data);
  } catch (error) {
    if (error instanceof CloudflareApiError || error instanceof Error) {
      throw error;
    }
    console.error("Unexpected error getting custom hostname:", error);
    throw new CloudflareApiError("Failed to get custom hostname");
  }
};

export const deleteCustomHostnameById = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostnameId,
}: DeleteHostnameByIdConfig): Promise<{ id: string }> => {
  try {
    const data = await makeCloudflareRequest<{ id?: string }>({
      method: "DELETE",
      url,
      endpoint: `/${hostnameId}`,
    });

    return { id: data.id ?? "" };
  } catch (error) {
    if (error instanceof CloudflareApiError || error instanceof Error) {
      throw error;
    }
    console.error("Unexpected error deleting custom hostname:", error);
    throw new CloudflareApiError("Failed to delete custom hostname");
  }
};
