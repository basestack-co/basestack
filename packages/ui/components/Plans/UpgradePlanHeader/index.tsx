// Components
import { Icon, Segment, Text } from "@basestack/design-system";
import { useTranslations } from "next-intl";
import React from "react";
import { useTheme } from "styled-components";
import type { SpaceProps } from "styled-system";
// Types
import type { BillingInterval } from "../types";
import { Container, Content, LeftContent, StyledLink } from "./styles";

interface UpgradePlanHeaderProps extends SpaceProps {
  onSelectCycle: (value: BillingInterval) => void;
  externalCompareUrl: string;
}

const UpgradePlanHeader = ({
  onSelectCycle,
  externalCompareUrl,
  ...props
}: UpgradePlanHeaderProps) => {
  const t = useTranslations("profile");
  const theme = useTheme();

  return (
    <Container {...props}>
      <Text size="large" mb={theme.spacing.s4}>
        {t("billing.plan.upgrade.title")}
      </Text>
      <Content>
        <LeftContent>
          <Text size="small" muted>
            {t("billing.plan.upgrade.description")}
          </Text>
          <Segment
            onSelect={(value) => onSelectCycle(value as BillingInterval)}
            selectedIndex={0}
            items={[
              { id: "monthly", text: t("billing.segment.monthly") },
              { id: "yearly", text: t("billing.segment.yearly") },
            ]}
          />
        </LeftContent>
        <StyledLink href={externalCompareUrl} target="_blank">
          <Text color="inherit" size="small">
            {t("billing.link.compare")}
          </Text>
          <Icon
            icon="open_in_new"
            color="inherit"
            size="small"
            ml={theme.spacing.s1}
          />
        </StyledLink>
      </Content>
    </Container>
  );
};

export default UpgradePlanHeader;
