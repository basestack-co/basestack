import React from "react";
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";
// Components
import {
  Button,
  ButtonVariant,
  Card,
  HorizontalRule,
  IconBox,
  Label,
  Text,
} from "@basestack/design-system";
// Styles
import {
  Column,
  ContentContainer,
  FooterContainer,
  Row,
  Separator,
} from "./styles";

export interface CurrentPlan {
  name: string;
  amount: number;
  country: string;
}

export interface ActivePlanProps {
  isActive: boolean;
  isBilledMonthly: boolean;
  onManage: () => void;
  renewsAt: string;
  currentPlan?: CurrentPlan;
  isLoadingExternalUrl: boolean;
}

const ActivePlan = ({
  isActive,
  onManage,
  isBilledMonthly,
  renewsAt,
  currentPlan,
  isLoadingExternalUrl,
}: ActivePlanProps) => {
  const t = useTranslations("profile");
  const { spacing } = useTheme();

  const Header = () => {
    return (
      <Row alignItems="center" flexWrap="wrap" mb={spacing.s5}>
        <Text size="large" mr={spacing.s1}>
          {t("billing.plan.current.title")}
        </Text>
        <Text size="large" mr={spacing.s2}>
          {`(${currentPlan?.name})`}
        </Text>
        <Label
          variant={isActive ? "success" : "warning"}
          text={
            isActive
              ? t("billing.plan.current.status.active")
              : t("billing.plan.current.status.inactive")
          }
          isTranslucent
        />
      </Row>
    );
  };

  const CardDetails = () => {
    return (
      <Row alignItems="center">
        <IconBox icon="calendar_month" />
        <Column ml={spacing.s4}>
          <Text fontWeight={500} mb="2px">
            {`${t("billing.price.symbol")}${currentPlan?.amount} ${t("billing.price.abbr")}`}{" "}
            <Text as="span" muted fontWeight={400}>
              /{" "}
              {isBilledMonthly
                ? t("billing.cycle.monthly")
                : t("billing.cycle.yearly")}
            </Text>
          </Text>
          <Text muted fontWeight={400}>
            {t(`billing.plan.current.${isActive ? "renewal" : "ending"}`)}{" "}
            <Text as="span" fontWeight={500}>
              {renewsAt}
            </Text>
          </Text>
        </Column>
      </Row>
    );
  };

  const BillingDetails = () => {
    return (
      <Row alignItems="center">
        <IconBox icon="globe_uk" />
        <Column ml={spacing.s4}>
          <Text muted fontWeight={500} mb="2px">
            {currentPlan?.country}
          </Text>
        </Column>
      </Row>
    );
  };

  return (
    <Card width="100%">
      <Column p={spacing.s5}>
        <Header />
        <ContentContainer>
          <CardDetails />
          <Separator />
          <BillingDetails />
        </ContentContainer>
      </Column>
      <HorizontalRule mt="auto" />
      <FooterContainer>
        <Button
          onClick={onManage}
          variant={ButtonVariant.Secondary}
          isDisabled={isLoadingExternalUrl}
        >
          {t("billing.plan.current.button")}
        </Button>
      </FooterContainer>
    </Card>
  );
};

export default ActivePlan;
