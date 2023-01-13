import React, { useState, useEffect, useMemo } from "react";
// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlagFormInputs, FlagFormSchema } from "./types";
// Types
import { TabType } from "types/flags";
// Server
import { trpc } from "libs/trpc";
// Tabs
import Core from "./Tab/Core";
import Advance from "./Tab/Advance";
import History from "./Tab/History";

export interface UseFlagFormProps {
  isModalOpen: boolean;
  projectSlug: string;
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
  } = useForm<FlagFormInputs>({
    resolver: zodResolver(FlagFormSchema),
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

  useEffect(() => {
    if (isModalOpen && project) {
      const cache = trpcContext.environment.all.getData({
        projectId: project.id,
      });

      const environments = ((cache && cache.environments) || []).map(
        ({ id, name }) => ({
          id,
          name,
          enabled: false,
        })
      );
      setValue("environments", environments);
    }
  }, [isModalOpen, project, trpcContext, setValue]);

  const onRenderTab = () => {
    switch (selectedTab) {
      case TabType.CORE:
      default:
        return (
          <Core
            environments={watch("environments")}
            setValue={setValue}
            errors={errors}
            control={control}
            isSubmitting={isSubmitting}
          />
        );
      case TabType.ADVANCED:
        return <Advance setValue={setValue} />;
      case TabType.HISTORY:
        return <History />;
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
  } as const;
};

export default useFlagForm;
