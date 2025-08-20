// Types
import { MonitorType } from ".prisma/client";
// Components
import { zodResolver } from "@hookform/resolvers/zod";
// React
import { useCallback, useState } from "react";
// Form
import { useForm } from "react-hook-form";
import MonitorAdvancedTab from "./Tab/Advanced";
// Tabs
import MonitorCoreTab from "./Tab/Core";
import { FormSchema, type MonitorFormInputs, TabType } from "./types";

export const tabPosition: { [key in TabType]: number } = {
  [TabType.CORE]: 0,
  [TabType.ADVANCED]: 1,
};

const useMonitorForm = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.CORE);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<MonitorFormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      type: MonitorType.HTTP,
      interval: { value: "*/5 * * * *", label: "Every 5 minutes" },
      config: {
        cron: "*/5 * * * *",
        url: "",
        method: "GET",
        expectedStatus: 200,
        timeout: 5000,
        verifySSL: true,
        followRedirects: true,
        retries: 0,
        retryDelay: 1000,
        maxResponseSize: 1024 * 1024,
        headers: {},
        regions: [],
      },
    },
  });

  const onRenderTab = useCallback(
    (isLoading: boolean = false) => {
      switch (selectedTab) {
        case TabType.ADVANCED:
          return (
            <MonitorAdvancedTab
              errors={errors}
              control={control}
              isSubmitting={isSubmitting || isLoading}
            />
          );
        default:
          return (
            <MonitorCoreTab
              errors={errors}
              control={control}
              isSubmitting={isSubmitting || isLoading}
              watch={watch}
            />
          );
      }
    },
    [selectedTab, errors, control, isSubmitting, watch]
  );

  return {
    selectedTab,
    setSelectedTab,
    control,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    reset,
    watch,
    onRenderTab,
    getValues,
  } as const;
};

export default useMonitorForm;
