import React, { useState, Fragment } from "react";
// Router
import { useRouter } from "next/router";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
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
// Styles
import { Container, Header, Section, List, BottomContainer } from "./styles";

interface HomePageProps {
  data: Array<{
    formId: string;
    title: string;
    spam: number;
    submissions: FormCardProps["submissions"];
  }>;
  onCreateForm: () => void;
  isLoading: boolean;
}

const HomePage = ({ data, onCreateForm, isLoading }: HomePageProps) => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const router = useRouter();
  const [numberOfCards, setNumberOfCards] = useState(8);

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  return (
    <Container>
      <Section mb={theme.spacing.s7}>
        <Header>
          <Text size="xLarge" mr={theme.spacing.s5}>
            {t("forms.title")}
          </Text>
          {!!data?.length && (
            <Button
              flexShrink={0}
              variant={ButtonVariant.Outlined}
              onClick={onCreateForm}
            >
              {t("forms.action")}
            </Button>
          )}
        </Header>
        {isLoading ? (
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
        ) : (
          <Fragment>
            {!!data?.length ? (
              <List>
                {data.map(({ title, spam, submissions, formId }, index) => (
                  <FormCard
                    key={index}
                    text={title}
                    onClick={() =>
                      router.push({
                        pathname: "/form/[formId]/submissions",
                        query: { formId },
                      })
                    }
                    spam={spam}
                    submissions={submissions}
                  />
                ))}
              </List>
            ) : (
              <Empty
                iconName="text_snippet"
                title={t("forms.empty.title")}
                description={t("forms.empty.description")}
                button={{
                  text: t("forms.empty.action"),
                  onClick: () => setCreateFormModalOpen({ isOpen: true }),
                }}
              />
            )}
          </Fragment>
        )}
      </Section>
      <Section>
        <Header>
          <Text size="xLarge" mr={theme.spacing.s5}>
            {t("links.title")}
          </Text>
        </Header>
        <BottomContainer>
          <GetStartedCard />
          <LinksCard />
        </BottomContainer>
      </Section>
    </Container>
  );
};

export default HomePage;
