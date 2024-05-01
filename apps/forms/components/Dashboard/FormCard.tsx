import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Locales
import useTranslation from "next-translate/useTranslation";
// Hooks
import { useFloatingPopup } from "@basestack/hooks";
// Components
import { useTheme } from "styled-components";
import { animated } from "react-spring";
import {
  Avatar,
  Card,
  HorizontalRule,
  Icon,
  Text,
  IconButton,
  Popup,
} from "@basestack/design-system";
// Syles
import { Box, CardButton, ListItem } from "./styles";

export interface FormCardProps {
  formId: string;
  onClick: () => void;
  text: string;
  spam: number;
  submissions: {
    unread: number;
    read: number;
  };
}

interface DetailProps {
  value: number;
  icon: string;
  mr?: string;
}

const Detail = ({ value, icon, mr }: DetailProps) => {
  const theme = useTheme();

  return (
    <Box mr={mr} display="flex" alignItems="center">
      <Icon icon={icon} size="small" />
      <Text size="small" textAlign="left" ml={theme.spacing.s1}>
        {value >= 99 ? "+99" : value}
      </Text>
    </Box>
  );
};

const AnimatedPopup = animated(Popup);

const FormCard = ({
  onClick,
  text,
  spam,
  submissions,
  formId,
}: FormCardProps) => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const theme = useTheme();

  const {
    popupWrapperRef,
    x,
    y,
    refs,
    strategy,
    transition,
    getReferenceProps,
    getFloatingProps,
    onClickMore,
    onCloseMenu,
  } = useFloatingPopup({});

  const onClickMenuItem = useCallback(
    async (path: string) => {
      await router.push({
        pathname: `/form/[formId]/${path}`,
        query: { formId },
      });
    },
    [router, formId],
  );

  return (
    <ListItem ref={popupWrapperRef}>
      <IconButton
        {...getReferenceProps}
        ref={refs.setReference}
        position="absolute"
        onClick={onClickMore}
        top="10px"
        right="10px"
        icon="more_horiz"
      />
      {transition(
        (styles, item) =>
          item && (
            <AnimatedPopup
              {...getFloatingProps}
              ref={refs.setFloating}
              style={styles}
              position={strategy}
              top={y + 5}
              left={x}
              items={[
                {
                  text: t("forms.card.menu.submissions"),
                  onClick: () => onClickMenuItem("submissions"),
                },
                {
                  text: t("forms.card.menu.setup"),
                  onClick: () => onClickMenuItem("setup"),
                },
                {
                  text: t("forms.card.menu.settings"),
                  onClick: () => onClickMenuItem("settings/general"),
                },
              ]}
              onClickList={onCloseMenu}
            />
          ),
      )}
      <CardButton onClick={onClick}>
        <Card height="100%" width="100%" hasHoverAnimation>
          <Box mb="auto" p={theme.spacing.s5}>
            <Avatar
              size="xSmall"
              userName={text}
              alt={`${text} form`}
              round={false}
            />
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Box>
          <HorizontalRule />
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            p={`${theme.spacing.s3} ${theme.spacing.s5}`}
          >
            {!!submissions.unread && (
              <Detail
                icon="mark_email_unread"
                value={submissions.unread}
                mr={theme.spacing.s4}
              />
            )}
            {!!submissions.read && (
              <Detail
                icon="mark_email_read"
                value={submissions.read}
                mr={theme.spacing.s4}
              />
            )}
            {!submissions.read && !submissions.unread && (
              <Detail icon="mail" value={0} mr={theme.spacing.s4} />
            )}
            {!!spam && <Detail icon="report" value={spam} />}
          </Box>
        </Card>
      </CardButton>
    </ListItem>
  );
};

export default FormCard;
