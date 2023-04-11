import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text, Icon } from "@basestack/design-system";
// Types
import { FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";
import type { InteractionProps } from "react-json-view";

// Calendar
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// JSON Editor
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
// Utils
import dayjs from "dayjs";
import { CalendarContainer, ReactJsonContainer } from "../styles";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
  payload: string;
  expiredAt?: Date | null;
}

const AdvanceTab = ({ setValue, payload, expiredAt }: Props) => {
  const theme = useTheme();
  const [isCalenderOpen, setIsCalendarOpen] = useState(false);

  const onChangeJson = useCallback(
    ({ updated_src }: InteractionProps) => {
      setValue("payload", JSON.stringify(updated_src));
    },
    [setValue]
  );

  return (
    <>
      <InputGroup
        title="Expiration Date"
        inputProps={{
          onFocus: () => setIsCalendarOpen(true),
          onChange: (text) => console.log("text = ", text),
          placeholder: "mm/dd/yyyy",
          name: "date",
          value: !!expiredAt ? dayjs(expiredAt).format("MM/DD/YYYY") : "",
        }}
      />
      {isCalenderOpen && (
        <CalendarContainer>
          <Calendar
            onChange={(date: Date) => {
              setValue("expiredAt", date);
              setIsCalendarOpen(false);
            }}
            value={expiredAt}
            locale="en-US"
            minDate={new Date()}
            prevLabel={<Icon icon="chevron_left" size="small" />}
            prev2Label={<Icon icon="keyboard_double_arrow_left" size="small" />}
            nextLabel={<Icon icon="chevron_right" size="small" />}
            next2Label={
              <Icon icon="keyboard_double_arrow_right" size="small" />
            }
          />
        </CalendarContainer>
      )}
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
          iconStyle="square"
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
