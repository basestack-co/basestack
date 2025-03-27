export const isEmptyObject = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0;

export const isValidIpAddress = (ip: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

export const isRefererValid = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getValidWebsite = (referer: string, data: string): boolean => {
  try {
    const websites = data
      .split(",")
      .map((site) => site.trim())
      .filter(Boolean);

    const refererHost = new URL(referer).hostname;

    return websites.some((website) => {
      try {
        const websiteHost = new URL(
          website.startsWith("http") ? website : `https://${website}`,
        ).hostname;
        return refererHost === websiteHost;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
};
