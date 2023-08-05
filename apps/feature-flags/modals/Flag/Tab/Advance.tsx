import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
// Components
import { useTheme } from "styled-components";
import { Text, CalendarInput, Tabs } from "@basestack/design-system";
// Types
import { EnvironmentInput, FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";
import type { InteractionProps } from "react-json-view";
import { Value } from "react-calendar/src/shared/types";
// JSON Editor
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
// Utils
import dayjs from "dayjs";
// Styles
import { ReactJsonContainer } from "../styles";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
  environments: EnvironmentInput[];
}
const AdvanceTab = ({ setValue, environments }: Props) => {
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

  const createOnChangeHandler = <T extends Value | InteractionProps>(
    propName: string,
  ) => {
    return (data: T) => {
      let value = "";

      if (propName === "expiredAt") {
        value = (data ?? null) as unknown as string;
      }

      if (propName === "payload") {
        value = JSON.stringify((data as InteractionProps)?.updated_src ?? "{}");
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

  const onChangeJson = createOnChangeHandler<InteractionProps>("payload");
  const onChangeDate = createOnChangeHandler<Value>("expiredAt");

  return (
    <>
      <Tabs
        sliderPosition={activeTabIndex}
        onSelect={(_, index) => setActiveTabIndex(index)}
        items={tabs}
        type="buttons"
      />
      <CalendarInput
        isCalenderOpen={isCalenderOpen}
        onClickAway={() => setIsCalendarOpen(false)}
        inputTitle="Expiration Date"
        inputProps={{
          onFocus: () => setIsCalendarOpen(true),
          onChange: () => null,
          placeholder: "dd/mm/yyyy",
          name: "date",
          value: !!activeTabData?.expiredAt
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
        mt={theme.spacing.s6}
      />
      <Text
        fontWeight={500}
        size="small"
        mt={theme.spacing.s6}
        mb={theme.spacing.s2}
      >
        Payload
      </Text>
      <ReactJsonContainer>
        <ReactJson
          name="data"
          theme="chalk"
          iconStyle="triangle"
          defaultValue="string"
          src={JSON.parse(activeTabData?.payload ?? "{}")}
          onEdit={onChangeJson}
          onAdd={onChangeJson}
          onDelete={onChangeJson}
          enableClipboard={false}
          collapsed={false}
        />
      </ReactJsonContainer>
    </>
  );
};

export default AdvanceTab;
