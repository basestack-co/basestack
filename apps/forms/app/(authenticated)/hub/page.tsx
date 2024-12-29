"use client";

import React, { Fragment } from "react";
import Head from "next/head";
// Router
import { useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// Components
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
import FormCard from "components/Dashboard/FormCard";
import LinksCard from "components/Dashboard/LinksCard";
// Styles
import {
  Container,
  Header,
  Section,
  List,
  BottomContainer,
} from "components/Dashboard/styles";

const MainPage = () => {
  const t = useTranslations("home");
  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );
  const theme = useTheme();
  const router = useRouter();

  const { data, isLoading } = api.form.recent.useQuery(undefined, {
    select: (res) => {
      return res.map(({ id, name, _count, isEnabled }) => ({
        formId: id,
        title: name,
        spam: _count.spam,
        submissions: {
          unread: _count.unread,
          read: _count.read,
        },
        isEnabled: isEnabled,
      }));
    },
  });

  return (
    <Fragment>
      <Head>
        <title>Basestack / Forms</title>
      </Head>
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
                onClick={() => setCreateFormModalOpen({ isOpen: true })}
              >
                {t("forms.action")}
              </Button>
            )}
          </Header>
          {isLoading ? (
            <List>
              <Skeleton
                numberOfItems={1}
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
                  {data.map((item, index) => (
                    <FormCard
                      key={index}
                      formId={item.formId}
                      text={item.title}
                      onClick={() =>
                        router.push(`/hub/form/${item.formId}/submissions`)
                      }
                      spam={item.spam}
                      submissions={item.submissions}
                      isEnabled={item.isEnabled}
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
            <LinksCard />
          </BottomContainer>
        </Section>
      </Container>
    </Fragment>
  );
};

export default MainPage;
