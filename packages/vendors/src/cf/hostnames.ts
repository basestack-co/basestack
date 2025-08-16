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

export const createCustomHostname = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostname,
  metadata,
}: CreateHostnameConfig): Promise<HostnameResponse> => {
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.CLOUDFLARE_EMAIL!,
        "X-Auth-Key": process.env.CLOUDFLARE_API_KEY!,
      },
      body: JSON.stringify({
        hostname,
        custom_metadata: metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message);
    }

    return {
      id: data?.id ?? "",
      status: data?.status ?? "unknown",
      verificationErrors: data?.verification_errors ?? [],
      ownershipVerification: data?.ownership_verification ?? null,
      ownershipVerificationHttp: data?.ownership_verification_http ?? null,
    };
  } catch {
    throw new Error("Error calling Cloudflare Hostnames");
  }
};

export const getCustomHostnameById = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostnameId,
}: GetHostnameByIdConfig): Promise<HostnameResponse> => {
  try {
    const response = await fetch(`${url}/${hostnameId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.CLOUDFLARE_EMAIL!,
        "X-Auth-Key": process.env.CLOUDFLARE_API_KEY!,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.errors?.[0]?.message);
    }

    return {
      id: data?.id ?? "",
      status: data?.status ?? "unknown",
      verificationErrors: data?.verification_errors ?? [],
      ownershipVerification: data?.ownership_verification ?? null,
      ownershipVerificationHttp: data?.ownership_verification_http ?? null,
    };
  } catch {
    throw new Error("Error calling Cloudflare Hostnames");
  }
};

export const deleteCustomHostnameById = async ({
  url = CLOUDFLARE_HOSTNAMES_API_URL,
  hostnameId,
}: DeleteHostnameByIdConfig): Promise<{ id: string }> => {
  try {
    const response = await fetch(`${url}/${hostnameId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Email": process.env.CLOUDFLARE_EMAIL!,
        "X-Auth-Key": process.env.CLOUDFLARE_API_KEY!,
      },
    });

    const data = await response.json();

    return { id: data?.id ?? "" };
  } catch {
    throw new Error("Error calling Cloudflare Hostnames");
  }
};
