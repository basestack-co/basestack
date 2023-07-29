import React, { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
// Form
import { useForm, Controller } from "react-hook-form";
// Hooks
import { useClickAway } from "react-use";
// Components
import { useTheme } from "styled-components";
import { Text, CalendarInput, Select, Tabs } from "@basestack/design-system";
// Types
import { EnvironmentInput, FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";
import type { InteractionProps } from "react-json-view";
// JSON Editor
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
// Utils
import dayjs from "dayjs";
import { ReactJsonContainer } from "../styles";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
  payload: string;
  expiredAt?: Date | null;
  isUpdate?: boolean;
  environments: EnvironmentInput[];
}

const AdvanceTab = ({
  setValue,
  payload,
  expiredAt,
  isUpdate = false,
  environments,
}: Props) => {
  const theme = useTheme();
  const calendarInputRef = useRef(null);
  const [isCalenderOpen, setIsCalendarOpen] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const tabs = useMemo(() => {
    if (environments) {
      return environments.map((item) => ({
        id: item.id,
        text: item.name,
      }));
    }

    return [];
  }, [environments]);

  const activeTabIndex = useMemo(
    () => environments?.findIndex((env) => env.id === selectedTabId),
    [environments, selectedTabId],
  );

  const onChangeJson = useCallback(
    ({ updated_src }: InteractionProps) => {
      setValue("payload", JSON.stringify(updated_src));
    },
    [setValue],
  );

  useClickAway(calendarInputRef, () => {
    setIsCalendarOpen(false);
  });

  return (
    <>
      <Tabs
        sliderPosition={activeTabIndex >= 0 ? activeTabIndex : 0}
        onSelect={(item) => setSelectedTabId(item)}
        items={tabs}
        type="buttons"
      />
      <CalendarInput
        ref={calendarInputRef}
        isCalenderOpen={isCalenderOpen}
        inputTitle="Expiration Date"
        inputProps={{
          onFocus: () => setIsCalendarOpen(true),
          onChange: (text) => console.log("text = ", text),
          placeholder: "mm/dd/yyyy",
          name: "date",
          value: !!expiredAt ? dayjs(expiredAt).format("MM/DD/YYYY") : "",
          autoComplete: "off",
        }}
        calendarProps={{
          onChange: (date: any) => {
            setValue("expiredAt", date);
            setIsCalendarOpen(false);
          },
          value: expiredAt,
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
          src={typeof payload === "string" ? JSON.parse(payload) : payload}
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
