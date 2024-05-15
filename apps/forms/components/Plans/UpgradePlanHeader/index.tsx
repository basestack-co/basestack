import React from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
// Components
import { Icon, Segment, Text } from "@basestack/design-system";
import { Container, Content, StyledLink } from "./styles";

interface UpgradePlanHeaderProps extends SpaceProps {}

const UpgradePlanHeader = ({ ...props }: UpgradePlanHeaderProps) => {
  const theme = useTheme();

  return (
    <Container {...props}>
      <Text size="large">Upgrade Plan</Text>
      <Content>
        <Text size="small" muted>
          Select billing cycle
        </Text>
        <Segment
          onSelect={() => null}
          selectedIndex={0}
          items={[
            { id: "0", text: "monthly" },
            { id: "1", text: "yearly" },
          ]}
        />
        <StyledLink href="/">
          <Text color="inherit" size="small">
            Compare Plans
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
