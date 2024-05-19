import React from "react";
import { useTheme } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { SpaceProps } from "styled-system";
// Components
import { Icon, Segment, Text } from "@basestack/design-system";
import { Container, Content, LeftContent, StyledLink } from "./styles";
// Types
import { BillingInterval } from "../types";

interface UpgradePlanHeaderProps extends SpaceProps {
  onSelectCycle: (value: BillingInterval) => void;
}

const UpgradePlanHeader = ({
  onSelectCycle,
  ...props
}: UpgradePlanHeaderProps) => {
  const { t } = useTranslation("profile");
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
        <StyledLink href="/">
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
