import React from "react";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
} from "@basestack/design-system";
import FormCard, { FormCardProps } from "./FormCard";
import { Container, Header, Section, List } from "./styles";

interface HomePageProps {
  data: Array<{
    title: string;
    spam: number;
    submissions: FormCardProps["submissions"];
  }>;
  onCreateForm: () => void;
  isLoading: boolean;
}

const HomePage = ({ data, onCreateForm, isLoading }: HomePageProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Section mb={theme.spacing.s7}>
        <Header>
          <Text size="xLarge" mr={theme.spacing.s5}>
            Recent Forms
          </Text>
          {!!data?.length && (
            <Button
              flexShrink={0}
              variant={ButtonVariant.Outlined}
              onClick={onCreateForm}
            >
              Create Form
            </Button>
          )}
        </Header>
        {isLoading && (
          <List>
            <Skeleton
              numberOfItems={3}
              items={[
                { h: 28, w: 28, mb: 12 },
                { h: 22, w: "50%", mb: 32 },
                { h: 22, w: 28 },
              ]}
              padding="20px 20px 12px 20px"
            />
          </List>
        )}
        {!isLoading && !!data?.length && (
          <List>
            {data.map((item, index) => (
              <FormCard
                key={index}
                text={item.title}
                onClick={() => null}
                spam={item.spam}
                submissions={item.submissions}
              />
            ))}
          </List>
        )}
      </Section>
      <Section>
        <Header>
          <Text size="xLarge" mr={theme.spacing.s5}>
            Quick Links
          </Text>
        </Header>
      </Section>
    </Container>
  );
};

export default HomePage;
