import { Loader, Skeleton, Table } from "@basestack/design-system";
import { SettingCard } from "@basestack/ui";
import { createTable } from "@basestack/utils";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { api } from "utils/trpc/react";

const KeysCard = () => {
  const t = useTranslations("setting");
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading } = api.projectKeys.list.useQuery(
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
        <Table data={getTable} />
      )}
    </SettingCard>
  );
};

export default KeysCard;
