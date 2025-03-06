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
// Utils
import { config } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import {
  Column,
  ContentContainer,
  FooterContainer,
  Row,
  Separator,
} from "./styles";

interface ActivePlanProps {
  isActive: boolean;
  isBilledMonthly: boolean;
  cardBrand: string;
  cardLastFour: string;
  onManage: () => void;
  onUpdate: () => void;
  renewsAt: string;
  variantId: number;
}

const ActivePlan = ({
  variantId,
  isActive,
  onManage,
  onUpdate,
  cardLastFour,
  isBilledMonthly,
  renewsAt,
  cardBrand,
}: ActivePlanProps) => {
  const t = useTranslations("profile");
  const { spacing } = useTheme();
  const currentPlan = config.plans.getFlagsPlanByVariantId(variantId, AppMode);
  const price = isBilledMonthly
    ? currentPlan?.price.monthly.amount
    : currentPlan?.price.yearly.amount;

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
            {`${t("billing.price.symbol")}${price} ${t("billing.price.abbr")}`}{" "}
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
        <IconBox icon="credit_card" />
        <Column ml={spacing.s4}>
          <Text muted fontWeight={500} mb="2px">
            {cardBrand.toUpperCase()}
          </Text>
          <Text muted fontWeight={500}>
            {t("billing.plan.details.lastFour")}{" "}
            <Text as="span" fontWeight={500}>
              {cardLastFour}
            </Text>
          </Text>
        </Column>
      </Row>
    );
  };

  return (
    <Card hasHoverAnimation width="100%">
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
        <Button onClick={onUpdate} variant={ButtonVariant.Outlined}>
          {t("billing.plan.details.button")}
        </Button>
        <Button onClick={onManage} variant={ButtonVariant.Secondary}>
          {t("billing.plan.current.button")}
        </Button>
      </FooterContainer>
    </Card>
  );
};

export default ActivePlan;
