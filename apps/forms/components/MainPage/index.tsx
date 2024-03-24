import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useTrail, animated } from "@react-spring/web";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
import FormCard, { FormCardProps } from "./FormCard";
import { Container, Header, Section, List, Box } from "./styles";

interface HomePageProps {
  data: Array<{
    title: string;
    spam: number;
    submissions: FormCardProps["submissions"];
  }>;
  onCreateForm: () => void;
  isLoading: boolean;
}

const AnimatedBox = animated(Box);

const HomePage = ({ data, onCreateForm, isLoading }: HomePageProps) => {
  const theme = useTheme();
  const [numberOfCards, setNumberOfCards] = useState(10);

  const trails = useTrail(data.slice(0, numberOfCards).length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

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
        {!isLoading && !!data?.length ? (
          <List>
            {trails.map((style, index) => {
              const { title, spam, submissions } = data[index];
              return (
                <AnimatedBox
                  key={index}
                  display="flex"
                  flexDirection="column"
                  style={style}
                >
                  <FormCard
                    text={title}
                    onClick={() => null}
                    spam={spam}
                    submissions={submissions}
                  />
                </AnimatedBox>
              );
            })}
          </List>
        ) : (
          <Empty
            iconName="text_snippet"
            title="No recent froms"
            description="Recent form will be displayed here"
            button={{
              text: "Create Form",
              onClick: () => null,
            }}
          />
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
