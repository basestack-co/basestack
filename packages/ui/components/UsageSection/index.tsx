import React from "react";
// Components
import { Text } from "@basestack/design-system";
import { SpaceProps } from "styled-system";
// UI
import UsageCard, { UsageCardProps } from "../UsageCard";
// Styles
import {
  Header,
  Section,
  StyledLink,
  Container,
  LinkContainer,
} from "./styles";
import { useTheme } from "styled-components";

export interface UsageSectionProps extends SpaceProps {
  title: string;
  date: string;
  link: string;
  data: UsageCardProps[];
  href: string;
}

const UsageSection = ({
  title,
  date,
  href,
  link,
  data,
  ...props
}: UsageSectionProps) => {
  const theme = useTheme();

  return (
    <Section {...props}>
      <Header>
        <Text size="xLarge" mr={theme.spacing.s5}>
          {title}
        </Text>

        <LinkContainer>
          {!!date && (
            <>
              <Text size="small" muted>
                {date}
              </Text>
              <Text size="small" muted mx={theme.spacing.s2}>
                •
              </Text>
            </>
          )}
          <StyledLink href={href}>
            <Text color="inherit" size="small" fontWeight={500}>
              {link}
            </Text>
          </StyledLink>
        </LinkContainer>
      </Header>
      <Container>
        {data.map((item, index) => (
          <UsageCard
            key={index}
            title={item.title}
            used={item.used}
            total={item.total}
            description={item.description}
          />
        ))}
      </Container>
    </Section>
  );
};

export default UsageSection;
