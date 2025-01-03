import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { useMedia } from "react-use";
// Router
import { useParams } from "next/navigation";
// Components
import { Loader, Skeleton, Table } from "@basestack/design-system";
// UI
import { SettingCard, MobileSettingCardView } from "@basestack/ui";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { createTable } from "@basestack/utils";

const KeysCard = () => {
  const t = useTranslations("setting");
  const theme = useTheme();
  const isMobile = useMedia(theme.device.max.md, false);
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading } = api.project.allKeys.useQuery(
    { projectId },
    { enabled: !!projectId },
  );

  const environments = useMemo(
    () => (!isLoading && !!data && !!data.keys ? data.keys.environments : []),
    [data, isLoading],
  );

  const getTable = useMemo(() => {
    return createTable(
      environments,
      [
        t("general.keys.table.headers.name"),
        t("general.keys.table.headers.key"),
      ],
      (item) => [{ title: item.name }, { title: item.key!, hideText: true }],
      () => [],
      (item) => ({
        textToCopy: item.key || "",
        defaultText: t("common.copy.key.default"),
        successText: t("common.copy.key.success"),
      }),
    );
  }, [environments, t]);

  const getContent = () => {
    if (isMobile) {
      return environments?.map(({ key, name, id }) => (
        <MobileSettingCardView
          key={id}
          title={name}
          data={[
            { icon: "badge", text: id },
            { icon: "key", text: key || "" },
          ]}
        />
      ));
    }

    return <Table data={getTable} />;
  };

  return (
    <SettingCard
      title={t("general.keys.title")}
      description={t("general.keys.description")}
      hasFooter={false}
    >
      {isLoading || !data ? (
        <Loader hasDelay={false}>
          <Skeleton
            items={[
              { h: 25, w: "15%", mb: 10 },
              { h: 1, w: "100%", mb: 10 },
              { h: 50, w: "100%", mb: 10 },
              { h: 50, w: "100%" },
            ]}
            padding={20}
            hasShadow={false}
          />
        </Loader>
      ) : (
        <>{getContent()}</>
      )}
    </SettingCard>
  );
};

export default KeysCard;
