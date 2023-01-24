import React, { useCallback } from "react";
import dynamic from "next/dynamic";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text } from "@basestack/design-system";
// Types
import { FlagFormInputs } from "../types";
import { UseFormSetValue } from "react-hook-form";
import type { InteractionProps } from "react-json-view";

// Calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// JSON Editor
const ReactJson = dynamic(import("react-json-view"), { ssr: false });
// Utils
import dayjs from "dayjs";

export interface Props {
  setValue: UseFormSetValue<FlagFormInputs>;
  payload: string;
  expiredAt?: Date | null;
}

const AdvanceTab = ({ setValue, payload, expiredAt }: Props) => {
  const theme = useTheme();

  const onChangeJson = useCallback(
    ({ updated_src }: InteractionProps) => {
      setValue("payload", JSON.stringify(updated_src));
    },
    [setValue]
  );

  return (
    <>
      <Text size="small">
        The same content will be applied in all environments. Later it is
        possible to edit the content by environment.
      </Text>

      <br />

      <InputGroup
        title="Expiration Date"
        inputProps={{
          onChange: (text) => console.log("text = ", text),
          placeholder: "mm/dd/yyyy",
          name: "date",
          value: !!expiredAt ? dayjs(expiredAt).format("MM/DD/YYYY") : "",
        }}
        mb={theme.spacing.s6}
      />
      <Calendar
        onChange={(date: Date) => setValue("expiredAt", date)}
        value={expiredAt}
        locale="en-US"
        minDate={new Date()}
      />
      <br />
      <Text fontWeight={500} size="small">
        Payload
      </Text>
      <br />
      <ReactJson
        name="data"
        iconStyle="square"
        defaultValue="string"
        src={JSON.parse(payload)}
        onEdit={onChangeJson}
        onAdd={onChangeJson}
        onDelete={onChangeJson}
        enableClipboard={false}
        collapsed={false}
      />
    </>
  );
};

export default AdvanceTab;
