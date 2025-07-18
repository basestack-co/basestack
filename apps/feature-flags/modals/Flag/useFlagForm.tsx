import React, { useState, useMemo } from "react";
// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagFormInputs, FlagFormSchema } from "./types";
// Types
import { TabType } from "types";
// Server
import { api } from "utils/trpc/react";
// Tabs
import Core from "./Tab/Core";
import Advance from "./Tab/Advance";
import History from "./Tab/History";

export interface UseFlagFormProps {
  isModalOpen: boolean;
  projectId: string;
  flagId?: string;
}

export const tabPosition: { [key in TabType]: number } = {
  [TabType.CORE]: 0,
  [TabType.ADVANCED]: 1,
  [TabType.HISTORY]: 2,
};

const useFlagForm = ({
  isModalOpen,
  projectId,
  flagId = "",
}: UseFlagFormProps) => {
  const trpcUtils = api.useUtils();
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
    resolver: zodResolver(FlagFormSchema),
    mode: "onChange",
  });

  const project = useMemo(() => {
    if (isModalOpen && projectId) {
      const cache = trpcUtils.projects.list.getData();

      return ((cache && cache.projects) || []).find(
        (project) => project.id === projectId,
      );
    }

    return null;
  }, [projectId, isModalOpen, trpcUtils]);

  const onRenderTab = (isLoading: boolean = false) => {
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
          />
        );
      case TabType.ADVANCED:
        return (
          <Advance setValue={setValue} environments={watch("environments")} />
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
