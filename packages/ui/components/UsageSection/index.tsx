// Components
import { Skeleton, Text } from "@basestack/design-system";
import { useTheme } from "styled-components";
import type { SpaceProps } from "styled-system";
// UI
import UsageCard, { type UsageCardProps } from "../UsageCard";
// Styles
import {
  Container,
  Header,
  LinkContainer,
  Section,
  StyledLink,
} from "./styles";

export interface UsageSectionProps extends SpaceProps {
  title?: string;
  date?: string;
  link?: string;
  data: UsageCardProps[];
  href?: string;
  isLoading?: boolean;
}

const UsageSection = ({
  title,
  date,
  href,
  link,
  data,
  isLoading = false,
  ...props
}: UsageSectionProps) => {
  const theme = useTheme();

  return (
    <Section {...props}>
      {!!title && (
        <Header>
          <Text size="xLarge" mr={theme.spacing.s5}>
            {title}
          </Text>
          {!isLoading && (
            <LinkContainer>
              {!!date && (
                <Text size="small" muted>
                  {date}
                </Text>
              )}
              {!!date && !!link && (
                <Text size="small" muted mx={theme.spacing.s2}>
                  •
                </Text>
              )}
              {!!link && (
                <StyledLink href={href ?? ""}>
                  <Text color="inherit" size="small" fontWeight={500}>
                    {link}
                  </Text>
                </StyledLink>
              )}
            </LinkContainer>
          )}
        </Header>
      )}
      <Container>
        {isLoading ? (
          <Skeleton
            numberOfItems={4}
            items={[
              { h: 20, w: "50%", mt: 2, mb: 12 },
              { h: 28, w: 50, mb: 0 },
            ]}
            padding="20px"
          />
        ) : (
          data.map((item, index) => (
            <UsageCard
              key={index}
              title={item.title}
              used={item.used}
              total={item.total}
              description={item.description}
            />
          ))
        )}
      </Container>
    </Section>
  );
};

export default UsageSection;
