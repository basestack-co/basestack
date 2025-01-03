import React, { useCallback } from "react";
// Router
import { useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
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
  Label,
  CardVariant,
} from "@basestack/design-system";
// Styles
import {
  AvatarContainer,
  Button,
  Content,
  DetailContainer,
  Footer,
  ListItem,
} from "./styles";

export interface FormCardProps {
  formId: string;
  onClick: () => void;
  text: string;
  spam: number;
  submissions: {
    unread: number;
    read: number;
  };
  isEnabled?: boolean;
}

interface DetailProps {
  value: number;
  icon: string;
  mr?: string;
}

const Detail = ({ value, icon, mr }: DetailProps) => {
  const theme = useTheme();

  return (
    <DetailContainer>
      <Icon icon={icon} size="small" />
      <Text size="small" textAlign="left" ml={theme.spacing.s1}>
        {value >= 99 ? "+99" : value}
      </Text>
    </DetailContainer>
  );
};

const AnimatedPopup = animated(Popup);

const FormCard = ({
  onClick,
  text,
  spam,
  submissions,
  formId,
  isEnabled = true,
}: FormCardProps) => {
  const t = useTranslations("home");
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
    (path: string) => {
      router.push(`/a/form/${formId}/${path}`);
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
      <Button onClick={onClick}>
        <Card
          variant={!isEnabled ? CardVariant.WARNING : CardVariant.DEFAULT}
          height="100%"
          width="100%"
          hasHoverAnimation
        >
          <Content>
            <AvatarContainer>
              <Avatar
                size="xSmall"
                userName={text}
                alt={`${text} form`}
                round={false}
              />
              {!isEnabled && (
                <Label
                  variant="warning"
                  size="small"
                  text={t("forms.card.label.disabled")}
                  ml={theme.spacing.s3}
                />
              )}
            </AvatarContainer>
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Content>
          <HorizontalRule />
          <Footer>
            {!!submissions.unread && (
              <Detail icon="mark_email_unread" value={submissions.unread} />
            )}
            {!!submissions.read && (
              <Detail icon="mark_email_read" value={submissions.read} />
            )}
            {!submissions.read && !submissions.unread && (
              <Detail icon="mail" value={0} mr={theme.spacing.s4} />
            )}
            {!!spam && <Detail icon="report" value={spam} />}
          </Footer>
        </Card>
      </Button>
    </ListItem>
  );
};

export default FormCard;
