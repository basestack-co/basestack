import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
// Components
import { useTheme } from "styled-components";
import { Text, CalendarInput, Tabs } from "@basestack/design-system";
// Types
import { EnvironmentInput, FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";
import type { Value } from "react-calendar/src/shared/types";
// Utils
import dayjs from "dayjs";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { EditorContainer } from "../styles";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
  environments: EnvironmentInput[];
}

const AdvanceTab = ({ setValue, environments }: Props) => {
  const t = useTranslations();
  const theme = useTheme();
  const [isCalenderOpen, setIsCalendarOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = useMemo(() => {
    if (environments) {
      return environments.map((item) => ({
        id: item.id,
        text: item.name,
      }));
    }

    return [];
  }, [environments]);

  const activeTabData = useMemo(
    () => environments?.[activeTabIndex],
    [environments, activeTabIndex],
  );

  const createOnChangeHandler = <T extends Value | string | undefined>(
    propName: string,
  ) => {
    return (data: T) => {
      let value = "";

      if (propName === "expiredAt") {
        value = (data ?? null) as unknown as string;
      }

      if (propName === "payload") {
        value = (data as string) ?? "{}";
      }

      setValue(
        "environments",
        environments.map((item, index) =>
          index === activeTabIndex
            ? {
                ...item,
                [propName]: value,
              }
            : item,
        ),
      );

      if (propName === "expiredAt") {
        setIsCalendarOpen(false);
      }
    };
  };

  const onChangeJson = createOnChangeHandler<string | undefined>("payload");
  const onChangeDate = createOnChangeHandler<Value>("expiredAt");

  return (
    <>
      {tabs.length > 1 && (
        <Tabs
          sliderPosition={activeTabIndex}
          onSelect={(_, index) => setActiveTabIndex(index)}
          items={tabs}
          type="buttons"
        />
      )}
      <CalendarInput
        isCalenderOpen={isCalenderOpen}
        onClickAway={() => setIsCalendarOpen(false)}
        inputTitle={t("modal.flag.tab.advanced.input.calendar.title")}
        inputProps={{
          onFocus: () => setIsCalendarOpen(true),
          onChange: () => null,
          placeholder: t("modal.flag.tab.advanced.input.calendar.placeholder"),
          name: "date",
          value: activeTabData?.expiredAt
            ? dayjs(activeTabData.expiredAt).format("DD/MM/YYYY")
            : "",
          autoComplete: "off",
        }}
        calendarProps={{
          onChange: onChangeDate,
          value: activeTabData?.expiredAt,
          locale: "en-US",
          minDate: new Date(),
        }}
        mt={tabs.length > 1 ? theme.spacing.s6 : 0}
      />
      <Text
        fontWeight={500}
        size="small"
        mt={theme.spacing.s6}
        mb={theme.spacing.s2}
      >
        {t("modal.flag.tab.advanced.input.payload.title")}
      </Text>
      <EditorContainer>
        <Editor
          theme="vs-dark"
          onChange={(value) => onChangeJson(value)}
          language="json"
          value={activeTabData?.payload ?? "{}"}
          options={{
            fontSize: "14px",
            formatOnPaste: true,
            inlineSuggest: false,
            formatOnType: true,
            autoClosingBrackets: true,
            stickyScroll: { enabled: false },
            minimap: {
              enabled: false,
            },
          }}
        />
      </EditorContainer>
    </>
  );
};

export default AdvanceTab;
