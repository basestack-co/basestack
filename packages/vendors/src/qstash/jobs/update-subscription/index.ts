// UpStash
import { serve } from "@upstash/workflow/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { UpdateSubscriptionEventPayload } from "../../types";
// Utils
import { PlanTypeId, SubscriptionEvent } from "@basestack/utils";

export interface UpdateSubscriptionJobArgs {
  product: string;
  onSuccess: (
    userId: string,
    planId: string,
    isUpdate: boolean,
    body: UpdateSubscriptionEventPayload,
  ) => Promise<any>;
}

export const UpdateSubscriptionJob = ({
  product,
  onSuccess,
}: UpdateSubscriptionJobArgs) =>
  serve<UpdateSubscriptionEventPayload>(
    async (context) => {
      const body = context.requestPayload;

      console.info(
        `Job: Update ${product} Subscriptions - Webhook Event Body`,
        body,
      );
      console.info(`Subscription Event:${body.meta.event_name}`);

      await context.run("update-user-subscription-step", async () => {
        const userId = body.meta.custom_data.user_id;

        const isUpdate =
          SubscriptionEvent.SUBSCRIPTION_UPDATED === body.meta.event_name;

        const planId = (body.meta.custom_data.plan_id ??
          PlanTypeId.FREE) as PlanTypeId;

        const res = await onSuccess(userId, planId, isUpdate, body);

        console.info(
          `Job: Update ${product} Subscriptions - Subscription updated on DB`,
          res,
        );
      });
    },
    {
      receiver: new Receiver({
        currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
        nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
      }),
      failureFunction: async ({
        context,
        failStatus,
        failResponse,
        failHeaders,
      }) => {
        console.error(
          `Job: Update ${product} Subscriptions - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
        );
      },
    },
  );
