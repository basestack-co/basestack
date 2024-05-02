import React, { Fragment, useCallback } from "react";
import Head from "next/head";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Toast
import { toast } from "sonner";
// Utils
import { config, PlanTypeId } from "@basestack/utils";
// Components
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
import FormCard from "components/Dashboard/FormCard";
import GetStartedCard from "components/Dashboard/GetStartedCard";
import LinksCard from "components/Dashboard/LinksCard";
// Styles
import {
  Container,
  Header,
  Section,
  List,
  BottomContainer,
} from "components/Dashboard/styles";
// Layout
import MainLayout from "layouts/Main";

const MainPage = () => {
  const { t } = useTranslation("home");
  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );
  const theme = useTheme();
  const router = useRouter();

  const createSubscription = trpc.subscription.create.useMutation();

  const onSelectSubscription = useCallback(
    (planId: PlanTypeId, subscriptionId: string) => {
      createSubscription.mutate(
        {
          planId,
          subscriptionId,
        },
        {
          onSuccess: async (result) => {
            console.log("createSubscription success result", result);
            toast.success("Subscription created, redirecting...");
            await router.replace("/");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [createSubscription, router],
  );

  return (
    <Fragment>
      <Head>
        <title>Basestack / Forms - Plans</title>
      </Head>
      <div>
        <h1>Plans</h1>
        <hr />

        <ul>
          {config.plans.forms.map((plan) => {
            return (
              <Fragment key={plan.id}>
                <li>Plan Id: {plan.id}</li>
                <li>
                  <button
                    onClick={() => onSelectSubscription(plan.id, "testMode")}
                  >
                    Select plan
                  </button>
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <br />
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
