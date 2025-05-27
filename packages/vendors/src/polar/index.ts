// Polar
import { Polar } from "@polar-sh/sdk";
// Cache
import { client as redis } from "../redis";

export const client = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server:
    process.env.NEXT_PUBLIC_APP_MODE === "production"
      ? "production"
      : "sandbox",
});

export const getCustomerSubscription = async (externalId: string) => {
  if (!externalId) return null;

  const cacheKey = `subscription:${externalId}`;

  try {
    let customerRaw = await redis.get(cacheKey);
    let customer: any = null;

    if (customerRaw) {
      customer =
        typeof customerRaw === "string" ? JSON.parse(customerRaw) : customerRaw;
    } else {
      customer = await client.customers.getStateExternal({
        externalId,
      });
      if (customer) {
        await redis.set(cacheKey, JSON.stringify(customer), { ex: 120 });
      }
    }

    if (!customer) return null;

    const sub = customer.activeSubscriptions?.[0];

    return {
      id: sub?.id ?? "",
      status: sub?.status ?? "",
      amount: sub?.amount ?? 0,
      currency: sub?.currency ?? "",
      recurringInterval: sub?.recurringInterval ?? "month",
      currentPeriodEnd: sub?.currentPeriodEnd ?? "",
      country: customer?.billingAddress?.country ?? "",
    };
  } catch (err) {
    return null;
  }
};
