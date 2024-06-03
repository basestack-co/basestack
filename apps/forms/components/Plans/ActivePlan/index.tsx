import React from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import {
  Card,
  Text,
  HorizontalRule,
  Button,
  ButtonVariant,
  IconBox,
  Label,
} from "@basestack/design-system";
// Utils
import { config } from "@basestack/utils";
// Styles
import { Column, Container, FooterContainer, Row } from "./styles";

interface ActivePlanProps {
  isActive: boolean;
  isBilledMonthly: boolean;
  cardBrand: string;
  cardLastFour: string;
  cardExpDate: string;
  onManage: () => void;
  onUpdate: () => void;
  renewsAt: string;
  variantId: number;
}

const Footer = ({
  onClick,
  text,
  variant = ButtonVariant.Outlined,
}: {
  onClick: () => void;
  text: string;
  variant?: ButtonVariant;
}) => (
  <>
    <HorizontalRule mt="auto" />
    <FooterContainer>
      <Button onClick={onClick} variant={variant}>
        {text}
      </Button>
    </FooterContainer>
  </>
);

const ActivePlan = ({
  variantId,
  isActive,
  onManage,
  onUpdate,
  cardLastFour,
  isBilledMonthly,
  renewsAt,
  cardExpDate,
}: ActivePlanProps) => {
  const { t } = useTranslation("profile");
  const { spacing } = useTheme();
  const currentPlan = config.plans.getFormPlanByVariantId(variantId);
  const price = isBilledMonthly
    ? currentPlan.price.monthly.amount
    : currentPlan.price.yearly.amount;

  return (
    <Container>
      <Card hasHoverAnimation width="100%">
        <Column p={spacing.s5}>
          <Row alignItems="center" flexWrap="wrap" mb={spacing.s4}>
            <Text size="large" mr={spacing.s1}>
              {t("billing.plan.current.title")}
            </Text>
            <Text size="large" mr={spacing.s2}>
              {`(${currentPlan.name})`}
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
                {t("billing.plan.current.date")}{" "}
                <Text as="span" fontWeight={500}>
                  {renewsAt}
                </Text>
              </Text>
            </Column>
          </Row>
        </Column>
        <Footer
          variant={ButtonVariant.Secondary}
          onClick={onManage}
          text={t("billing.plan.current.button")}
        />
      </Card>

      <Card hasHoverAnimation width="100%">
        <Column p={spacing.s5}>
          <Text size="large" mb={spacing.s5}>
            {t("billing.plan.details.title")}
          </Text>
          <Column>
            <Row alignItems="center">
              <IconBox icon="credit_card" />
              <Column ml={spacing.s4}>
                <Text muted fontWeight={500} mb="2px">
                  {t("billing.plan.details.lastFour")}{" "}
                  <Text as="span" fontWeight={500}>
                    {cardLastFour}
                  </Text>
                </Text>
                <Text muted fontWeight={500}>
                  {t("billing.plan.details.expDate")}{" "}
                  <Text as="span" fontWeight={500}>
                    {cardExpDate}
                  </Text>
                </Text>
              </Column>
            </Row>
          </Column>
        </Column>
        <Footer onClick={onUpdate} text={t("billing.plan.details.button")} />
      </Card>
    </Container>
  );
};

export default ActivePlan;
