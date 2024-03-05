import React, { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
// Components
import {
  Logo,
  Button,
  ButtonVariant,
  IconButton,
  PopupActionProps,
  Text,
} from "@basestack/design-system";
import { Container, List, ListItem, LogoContainer } from "./styles";
import ButtonLink from "../ButtonLink";
import FormsMenu from "../FormMenu";
import AvatarDropdown from "../../AvatarDropdown";
import { internalLinks, externalLinks } from "../data";
// Router
import { useRouter } from "next/router";
import Link from "next/link";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Auth
import { useSession } from "next-auth/react";

export interface LinkItem {
  text: string;
  to: string;
  isExternal?: boolean;
  i18nKey: string;
}

interface NavigationProps {
  isDesktop: boolean;
  data?: Array<PopupActionProps>;
  onClickMenuButton: () => void;
}

const Navigation = ({
  isDesktop,
  data,
  onClickMenuButton,
}: NavigationProps) => {
  const { t } = useTranslation("navigation");
  const theme = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  const formId = router.query.formId as string;

  const setCreateFormModalOpen = useStore(
    (state) => state.setCreateFormModalOpen,
  );

  const onRenderItems = useCallback(
    (items: LinkItem[], type: string) =>
      items.map(({ text, to, isExternal, i18nKey }, i) => {
        return (
          <ListItem key={`${type}-list-item-${i}`}>
            <ButtonLink
              href={to.replace("[formId]", formId)}
              isExternal={isExternal}
              isActive={
                router.pathname === to ||
                router.pathname.includes(text.toLowerCase())
              }
            >
              {t(i18nKey)}
            </ButtonLink>
          </ListItem>
        );
      }),
    [router.pathname, formId, t],
  );

  const currentForm = useMemo(() => {
    const form = data?.find(({ id }) => id === formId);

    return form?.text ?? "";
  }, [formId, data]);

  const truncateFormName = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

  return (
    <Container data-testid="navigation">
      <List data-testid="navigation-left-ul">
        {!isDesktop && (
          <>
            <ListItem>
              <IconButton
                mr={theme.spacing.s3}
                icon="menu"
                size="medium"
                onClick={onClickMenuButton}
              />
            </ListItem>
            {!!currentForm && (
              <ListItem>
                <Text size="medium">{truncateFormName(currentForm)}</Text>
              </ListItem>
            )}
          </>
        )}
        {isDesktop && (
          <>
            <ListItem>
              <Link href="/">
                <LogoContainer>
                  <Logo size={36} />
                </LogoContainer>
              </Link>
            </ListItem>
            <FormsMenu
              onClickCreateProject={() =>
                setCreateFormModalOpen({ isOpen: true })
              }
              currentProject={currentForm}
              projects={data ?? []}
            />
            {!!formId && (
              <>
                {onRenderItems(internalLinks, "left")}
                <ListItem ml={theme.spacing.s3}>
                  <Button onClick={() => {}} variant={ButtonVariant.Primary}>
                    {t("create.form")}
                  </Button>
                </ListItem>
              </>
            )}
          </>
        )}
      </List>
      {isDesktop && (
        <List ml="auto" data-testid="navigation-right-ul">
          {onRenderItems(externalLinks, "right")}
          <ListItem ml={theme.spacing.s3}>
            <AvatarDropdown
              name={session?.user.name || t("dropdown.username")}
              email={session?.user.email || ""}
              src={session?.user.image || ""}
            />
          </ListItem>
        </List>
      )}
    </Container>
  );
};

export default Navigation;
