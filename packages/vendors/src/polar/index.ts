// Polar
import { Polar } from "@polar-sh/sdk";
// Cache
import { client as redis } from "../redis";
// Utils
import { emailToId, Product, UsageEvent } from "@basestack/utils";

export const client = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server:
    process.env.NEXT_PUBLIC_APP_MODE === "production"
      ? "production"
      : "sandbox",
});

export const getCustomerSubscription = async (
  externalId: string,
  product: Product,
) => {
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
        // 2 minutes cache
        await redis.set(cacheKey, JSON.stringify(customer), { ex: 120 });
      }
    }

    if ((customer?.activeSubscriptions ?? []).length <= 0) return null;

    const sub = (customer?.activeSubscriptions ?? []).find(
      ({ metadata }: { metadata: { product: Product } }) =>
        metadata.product === product,
    );

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

export const createCustomerIfNotExists = async (
  name: string,
  email: string,
) => {
  try {
    const customerExternalId = emailToId(email);

    const customer = await client.customerSessions.create({
      customerExternalId,
    });

    if (!customer?.customerId) {
      await client.customers.create({
        email,
        name,
        externalId: customerExternalId,
      });
    }
  } catch (error) {
    console.error("Error creating customer in Polar", error, name, email);
  }
};

export const createUsageEvent = async (
  name: UsageEvent,
  externalCustomerId: string,
  metadata?: Record<string, string>,
) => {
  try {
    await client.events.ingest({
      events: [
        {
          name,
          externalCustomerId,
          metadata,
        },
      ],
    });
  } catch (error) {
    console.error(
      "Error creating usage event in Polar",
      error,
      name,
      externalCustomerId,
    );
  }
};
