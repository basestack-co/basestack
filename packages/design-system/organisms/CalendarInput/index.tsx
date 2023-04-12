import React, { forwardRef, memo } from "react";
// Calendar
import { CalendarProps } from "react-calendar";
// Components
import { Container } from "./styles";
import { Icon, InputProps } from "../../atoms";
import { InputGroup } from "../../molecules";
import Calendar from "../Calendar";

interface CalendarInput {
  isCalenderOpen: boolean;
  calendarProps: CalendarProps;
  inputTitle: string;
  inputProps: InputProps;
}

const CalendarInput = forwardRef<HTMLDivElement, CalendarInput>(
  ({ inputTitle, inputProps, isCalenderOpen, calendarProps }, ref) => (
    <Container ref={ref}>
      <InputGroup title={inputTitle} inputProps={inputProps} />
      {isCalenderOpen && (
        <Calendar
          {...calendarProps}
          prevLabel={<Icon icon="chevron_left" size="small" />}
          prev2Label={<Icon icon="keyboard_double_arrow_left" size="small" />}
          nextLabel={<Icon icon="chevron_right" size="small" />}
          next2Label={<Icon icon="keyboard_double_arrow_right" size="small" />}
        />
      )}
    </Container>
  )
);

CalendarInput.displayName = "CalendarInput";

export default memo(CalendarInput);
