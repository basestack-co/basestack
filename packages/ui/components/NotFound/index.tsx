// UI
import { Button, ButtonVariant, Label, Text } from "@basestack/design-system";
import { rem } from "polished";
import { useTheme } from "styled-components";
// Components
import { Container, ContentContainer } from "./styles";

export interface NotFoundProps {
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}

const NotFound = ({ onClick, title, description, action }: NotFoundProps) => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <Label text="404 error" variant="info" size="medium" isTranslucent />
        <Text
          size="xxLarge"
          fontSize={rem("28px")}
          lineHeight="1.4"
          mt={theme.spacing.s3}
          mb={theme.spacing.s1}
          fontWeight={800}
        >
          {title}
        </Text>
        <Text size="medium" fontWeight={400} lineHeight="1.6" muted>
          {description}
        </Text>
        <Button
          onClick={onClick}
          iconPlacement="left"
          icon="arrow_back"
          variant={ButtonVariant.Outlined}
          mt={theme.spacing.s6}
        >
          {action}
        </Button>
      </ContentContainer>
    </Container>
  );
};

export default NotFound;
