import React, { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
// Hooks
import { useClickAway } from "@basestack/hooks";
// Components
import { useTheme } from "styled-components";
import { Text, CalendarInput } from "@basestack/design-system";
// Types
import { FlagFormInputs } from "../types";
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
}

const AdvanceTab = ({ setValue, payload, expiredAt }: Props) => {
  const theme = useTheme();
  const calendarInputRef = useRef(null);
  const [isCalenderOpen, setIsCalendarOpen] = useState(false);

  const onChangeJson = useCallback(
    ({ updated_src }: InteractionProps) => {
      setValue("payload", JSON.stringify(updated_src));
    },
    [setValue]
  );

  useClickAway(calendarInputRef, () => {
    setIsCalendarOpen(false);
  });

  return (
    <>
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
          onChange: (date: Date) => {
            setValue("expiredAt", date);
            setIsCalendarOpen(false);
          },
          value: expiredAt,
          locale: "en-US",
          minDate: new Date(),
        }}
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
      <Text size="small" muted mt={theme.spacing.s6}>
        To ensure consistency, the identical content will be utilized across all
        environments. However, it will be possible to modify the content for
        each environment at a later stage.
      </Text>
    </>
  );
};

export default AdvanceTab;
