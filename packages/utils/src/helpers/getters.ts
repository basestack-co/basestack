// Utils
import { NextResponse } from "next/server";
import requestIp from "request-ip";
// Types
import { Product } from "../types";

export const getMetadata = (req: Request) => {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const ip = requestIp.getClientIp({ headers } as any);

  return {
    ip,
    referer: req.headers.get("referer") || "/",
    userAgent: req.headers.get("user-agent") || "",
    acceptLanguage: req.headers.get("accept-language") || "",
  };
};

export const getOriginOptions = async (
  req: Request,
  headers: Record<string, string>,
  formId: string,
  hasWebsitesFeature: boolean,
  websites: string,
  isRefererValid: boolean,
  isEnabled?: boolean,
) => {
  try {
    if (!formId) {
      return NextResponse.json(
        { error: "Missing form ID" },
        { status: 400, headers },
      );
    }

    const referer = req.headers.get("referer");
    const origin = referer ? new URL(referer).origin : "*";

    if (!isEnabled) {
      return NextResponse.json(
        { error: "Form not found or disabled" },
        { status: 403, headers },
      );
    }

    const normalizeUrl = (url: string) => url.replace(/\/$/, "");

    const allowedWebsites = websites
      ? websites.split(",").map((url) => normalizeUrl(url.trim()))
      : [];

    const isAllowed =
      !hasWebsitesFeature ||
      allowedWebsites.length === 0 ||
      (referer &&
        isRefererValid &&
        allowedWebsites.includes(normalizeUrl(origin)));

    return NextResponse.json(
      {},
      {
        status: isAllowed ? 200 : 403,
        headers: {
          ...headers,
          "Access-Control-Allow-Origin": isAllowed ? origin : "null",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers },
    );
  }
};

export const getAppsList = (
  t: (key: any) => string,
  onSelectApp: (app: Product) => void,
  activeApp?: Product,
) => {
  return [
    {
      onClick: () => onSelectApp(Product.FLAGS),
      product: Product.FLAGS,
      title: t("navigation.apps.flags.title"),
      description: t("navigation.apps.flags.description"),
      isActive: activeApp === Product.FLAGS,
    },
    {
      onClick: () => onSelectApp(Product.FORMS),
      product: Product.FORMS,
      title: t("navigation.apps.forms.title"),
      description: t("navigation.apps.forms.description"),
      isActive: activeApp === Product.FORMS,
    },
    {
      onClick: () => onSelectApp(Product.UPTIME),
      product: Product.UPTIME,
      title: t("navigation.apps.uptime.title"),
      description: t("navigation.apps.uptime.description"),
      isActive: activeApp === Product.UPTIME,
    },
  ];
};
