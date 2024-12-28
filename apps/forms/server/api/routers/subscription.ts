import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Payments
import {
  type NewCheckout,
  lemonSqueezySetup,
  createCheckout,
  getSubscription,
  listSubscriptionInvoices,
} from "@lemonsqueezy/lemonsqueezy.js";
// Utils
import dayjs from "dayjs";
import { getSubscriptionUsage } from "server/db/utils/subscription";
import { z } from "zod";
import { PlanTypeId, config } from "@basestack/utils";

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
  onError(error) {
    console.error("lemon Squeezy Setup error = ", error);
  },
});

export const subscriptionRouter = createTRPCRouter({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await getSubscriptionUsage(ctx.prisma, userId);
  }),
  invoices: protectedProcedure.query(async ({ ctx }) => {
    const subscriptionId = ctx.usage.subscriptionId;

    const { statusCode, error, data } = await listSubscriptionInvoices({
      filter: { subscriptionId },
    });

    if (error || statusCode !== 200) return null;

    const list = data?.data.map((item) => ({
      id: item.id,
      url: item.attributes.urls.invoice_url,
      status: item.attributes.status,
      currency: item.attributes.currency,
      customerId: item.attributes.customer_id,
      refunded: item.attributes.refunded,
      refundedAt: item.attributes.refunded_at,
      values: {
        subtotal: item.attributes.subtotal,
        discountTotal: item.attributes.discount_total,
        tax: item.attributes.tax,
        total: item.attributes.total,
        subtotalUsd: item.attributes.subtotal_usd,
        discountTotalUsd: item.attributes.discount_total_usd,
        taxUsd: item.attributes.tax_usd,
        totalUsd: item.attributes.total_usd,
      },
      formatted: {
        subtotal: item.attributes.subtotal_formatted,
        discountTotal: item.attributes.discount_total_formatted,
        tax: item.attributes.tax_formatted,
        total: item.attributes.total_formatted,
        status: item.attributes.status_formatted,
      },
    }));

    return { list };
  }),
  current: protectedProcedure.query(async ({ ctx }) => {
    const subscriptionId = ctx.usage.subscriptionId;

    if (!subscriptionId) return null;

    const { statusCode, error, data } = await getSubscription(subscriptionId);

    if (error || statusCode !== 200) return null;

    return {
      customerId: data?.data.attributes.customer_id,
      product: {
        id: data?.data.attributes.product_id,
        name: data?.data.attributes.product_name,
        variant: data?.data.attributes.variant_name,
        variantId: data?.data.attributes.variant_id,
      },
      status: data?.data.attributes.status,
      pause: data?.data.attributes.pause,
      cancelled: data?.data.attributes.cancelled,
      renewsAt: data?.data.attributes.renews_at,
      endsAt: data?.data.attributes.ends_at,
      testMode: data?.data.attributes.test_mode,
      card: {
        brand: data?.data.attributes.card_brand,
        lastFour: data?.data.attributes.card_last_four,
      },
      urls: {
        customerPortal: data?.data.attributes.urls.customer_portal,
        updatePaymentMethod: data?.data.attributes.urls.update_payment_method,
        customerPortalUpdateSubscription:
          data?.data.attributes.urls.customer_portal_update_subscription,
      },
    };
  }),
  checkout: protectedProcedure
    .input(
      z
        .object({
          planId: z.nativeEnum(PlanTypeId),
          interval: z.enum(["monthly", "yearly"]),
          isDarkMode: z.boolean().optional(),
          redirectUrl: z.string().url(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const email = ctx.session.user.email;
      const name = ctx.session.user.name;
      const storeId = +process.env.LEMONSQUEEZY_STORE_ID!;
      const variantId = config.plans.getFormPlanVariantId(
        input.planId,
        input.interval,
      );

      const configuration: NewCheckout = {
        productOptions: {
          redirectUrl: input.redirectUrl,
        },
        checkoutOptions: {
          dark: input.isDarkMode,
        },
        checkoutData: {
          email,
          name,
          custom: {
            userId,
            planId: input.planId,
          },
        },
        expiresAt: dayjs().add(1, "hour").format(),
        preview: true,
      };
      const { statusCode, error, data } = await createCheckout(
        storeId,
        variantId,
        configuration,
      );

      return {
        statusCode,
        error,
        url: data?.data.attributes.url,
      };
    }),
});
