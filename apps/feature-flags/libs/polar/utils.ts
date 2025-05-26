// Cache
import { redis } from "libs/redis/client";
// Polar Client
import { polarClient } from "libs/polar/client";

export const getCustomerSubscription = async (userId: string) => {
  if (!userId) return null;

  const cacheKey = `subscription:${userId}`;

  try {
    let customerRaw = await redis.get(cacheKey);
    let customer: any = null;

    if (customerRaw) {
      console.log("FROM CACHE");
      customer =
        typeof customerRaw === "string" ? JSON.parse(customerRaw) : customerRaw;
    } else {
      customer = await polarClient.customers.getStateExternal({
        externalId: userId,
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
