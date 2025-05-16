import React, { Fragment, useCallback } from "react";
// Router
import { useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// Components
import {
  Button,
  ButtonVariant,
  Skeleton,
  Text,
  Empty,
} from "@basestack/design-system";
import { ProjectCard as FormCard } from "@basestack/ui";
// Styles
import { useTheme } from "styled-components";
import { Header, Section, List } from "./styles";

const RecentForms = () => {
  const t = useTranslations("home");
  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );
  const theme = useTheme();
  const router = useRouter();

  const { data, isLoading } = api.form.recent.useQuery(undefined, {
    select: (res) => {
      return res.map(({ id, name, _count, isEnabled, isAdmin }) => ({
        formId: id,
        title: name,
        isAdmin,
        count: [
          {
            icon: "mark_email_unread",
            value: _count.unread ?? 0,
          },
          {
            icon: "mark_email_read",
            value: _count.read ?? 0,
          },
          {
            icon: "report",
            value: _count.spam ?? 0,
          },
        ],
        isEnabled: isEnabled,
      }));
    },
  });

  const onClickMenuItem = useCallback(
    (path: string, formId: string) => {
      router.push(`/a/form/${formId}/${path}`);
    },
    [router],
  );

  return (
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
              {data.map((form, index) => (
                <FormCard
                  key={index}
                  text={form.title}
                  onClick={() =>
                    router.push(`/a/form/${form.formId}/submissions`)
                  }
                  count={form.count}
                  menuItems={[
                    {
                      icon: "view_agenda",
                      text: t("forms.card.menu.submissions"),
                      onClick: () =>
                        onClickMenuItem("submissions", form.formId),
                    },
                    {
                      icon: "integration_instructions",
                      text: t("forms.card.menu.setup"),
                      onClick: () => onClickMenuItem("setup", form.formId),
                    },
                    {
                      icon: "settings",
                      text: t("forms.card.menu.settings"),
                      onClick: () =>
                        onClickMenuItem("settings/general", form.formId),
                    },
                  ]}
                  {...(!form.isAdmin && {
                    label: {
                      text: t("forms.tag.text"),
                      tooltip: t("forms.tag.tooltip"),
                    },
                  })}
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
  );
};

export default RecentForms;
