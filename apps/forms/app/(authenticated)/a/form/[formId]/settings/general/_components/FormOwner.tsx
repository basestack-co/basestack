import React from "react";
// UI
import { SettingCard } from "@basestack/ui";
// Locales
import { useTranslations } from "next-intl";

export interface Props {
  name: string;
  email: string;
  image: string;
}

const FormOwnerCard = ({ name, email, image }: Props) => {
  const t = useTranslations("setting");

  return (
    <SettingCard
      title={t("general.owner.title")}
      description={t("general.owner.description")}
      isDisabled={false}
      isLoading={false}
      hasFooter={false}
    >
      <>
        <div>name: {name}</div>
        <div>email: {email}</div>
        <div>image: {image}</div>
      </>
    </SettingCard>
  );
};

export default FormOwnerCard;
