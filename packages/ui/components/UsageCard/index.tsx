import { Card, CircularProgress, Text } from "@basestack/design-system";
import { memo } from "react";
import { useTheme } from "styled-components";
import { Container, ContentContainer } from "./styles";

interface UsageCardProps {
  title: string;
  description?: string;
  used: number;
  total: number;
}

const UsageCard = ({ title, description, used, total }: UsageCardProps) => {
  const theme = useTheme();

  const percentageUsed = total > 0 ? (used / total) * 100 : 0;
  const variant = percentageUsed >= 80 ? "danger" : "default";

  return (
    <Card p={theme.spacing.s5}>
      <Container>
        <ContentContainer>
          <Text size="small" fontWeight={400} mb={theme.spacing.s2}>
            {title}
          </Text>
          <Text size="xLarge" fontWeight={500}>
            {used.toLocaleString("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            })}
            &nbsp;
            {total !== Infinity && (
              <Text as="span" size="small" muted fontWeight={400}>
                /&nbsp;
                {total.toLocaleString("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                })}
                &nbsp;
              </Text>
            )}
            {!!description && (
              <Text as="span" size="small" muted fontWeight={400}>
                {description}
              </Text>
            )}
          </Text>
        </ContentContainer>
        <CircularProgress
          size={48}
          usage={used}
          total={total}
          variant={variant}
          description={total === Infinity ? total.toLocaleString("en-US") : ""}
        />
      </Container>
    </Card>
  );
};

export type { UsageCardProps };

export default memo(UsageCard);
