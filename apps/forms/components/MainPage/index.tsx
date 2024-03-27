import React from "react";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
import FormCard, { FormCardProps } from "./FormCard";
import GetStartedCard from "./GetStartedCard";
import LinksCard from "./LinksCard";
import {
  Container,
  Header,
  Section,
  List,
  BottomSectionContainer,
} from "./styles";

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
        {!isLoading && !!data?.length ? (
          <List>
            {data.slice(0, 8).map(({ title, spam, submissions }, index) => (
              <FormCard
                key={index}
                text={title}
                onClick={() => null}
                spam={spam}
                submissions={submissions}
              />
            ))}
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
        <BottomSectionContainer>
          <GetStartedCard />
          <LinksCard />
        </BottomSectionContainer>
      </Section>
    </Container>
  );
};

export default HomePage;
