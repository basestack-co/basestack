import { Avatar, Text } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Locales
import { useTranslations } from "next-intl";
import React from "react";
import styled, { useTheme } from "styled-components";

export interface Props {
  name: string;
  email: string;
  image: string;
}

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectOwnerCard = ({ name, email, image }: Props) => {
  const theme = useTheme();
  const t = useTranslations("setting");

  return (
    <SettingCard
      title={t("general.owner.title")}
      description={t("general.owner.description")}
      onClick={() => {}}
      isDisabled={false}
      isLoading={false}
      hasFooter={false}
    >
      <AvatarWrapper>
        <Avatar
          size="large"
          userName={name}
          alt="User Image"
          src={image}
          mr={theme.spacing.s3}
        />
        <div>
          <Text size="medium">{name}</Text>
          <Text size="small" muted lineHeight="1.2">
            {email}
          </Text>
        </div>
      </AvatarWrapper>
    </SettingCard>
  );
};

export default ProjectOwnerCard;
