import React, { useState, useEffect, useMemo } from "react";
// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagFormInputs, FlagFormSchema } from "./types";
// Types
import { TabType } from "types";
// Server
import { trpc } from "libs/trpc";
// Tabs
import Core from "./Tab/Core";
import Advance from "./Tab/Advance";
import History from "./Tab/History";

export interface UseFlagFormProps {
  isModalOpen: boolean;
  projectSlug: string;
  flagId?: string;
  isCreate?: boolean;
}

export const tabPosition: { [key in TabType]: number } = {
  [TabType.CORE]: 0,
  [TabType.ADVANCED]: 1,
  [TabType.HISTORY]: 2,
};

const useFlagForm = ({
  isModalOpen,
  projectSlug,
  flagId = "",
  isCreate = true,
}: UseFlagFormProps) => {
  const trpcContext = trpc.useContext();
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.CORE);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    getValues,
  } = useForm<FlagFormInputs>({
    // @ts-ignore
    resolver: zodResolver(FlagFormSchema), // TODO: fix this, broken after the 3.0.0 release
    mode: "onChange",
  });

  const project = useMemo(() => {
    if (isModalOpen && projectSlug) {
      const cache = trpcContext.project.all.getData();

      return ((cache && cache.projects) || []).find(
        (project) => project.slug === projectSlug
      );
    }

    return null;
  }, [projectSlug, isModalOpen, trpcContext]);



  const { data, isLoading } = trpc.environment.all.useQuery(
    { projectId: project?.id! },
    {
      enabled: !!project?.id,
    }
  );

  useEffect(() => {
    if (isModalOpen && !isLoading && isCreate) {
      const environments = ((data && data.environments) || []).map(
        ({ id, name }) => ({
          id,
          name,
          enabled: false,
        })
      );
      setValue("environments", environments);
    }
  }, [isModalOpen, data, isLoading, setValue, isCreate]);

  const onRenderTab = (
    isLoading: boolean = false,
    isUpdate: boolean = false
  ) => {
    switch (selectedTab) {
      case TabType.CORE:
      default:
        return (
          <Core
            environments={watch("environments")}
            setValue={setValue}
            errors={errors}
            control={control}
            isSubmitting={isSubmitting || isLoading}
            isCreate={isCreate}
          />
        );
      case TabType.ADVANCED:
        return (
          <Advance
            setValue={setValue}
            payload={watch("payload") ?? "{}"}
            expiredAt={watch("expiredAt")}
            isUpdate={isUpdate}
            environments={watch("environments")}
          />
        );
      case TabType.HISTORY:
        return <History flagId={flagId} projectId={project?.id!} />;
    }
  };

  return {
    selectedTab,
    setSelectedTab,
    control,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    setValue,
    reset,
    onRenderTab,
    project,
    getValues,
  } as const;
};

export default useFlagForm;
