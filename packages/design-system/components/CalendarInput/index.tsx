import React, { memo, useRef } from "react";
import { SpaceProps } from "styled-system";
import { useClickAway } from "react-use";
import {
  autoUpdate,
  offset,
  useFloating,
  FloatingPortal,
  shift,
  flip,
} from "@floating-ui/react";
// Calendar
import { CalendarProps } from "react-calendar";
// Components
import { CalendarReference, CalendarWrapper, Container } from "./styles";
import Icon from "../Icon";
import { InputProps } from "../Input";
import InputGroup from "../InputGroup";
import Calendar from "../Calendar";

export interface CalendarInputProps extends SpaceProps {
  isCalenderOpen: boolean;
  calendarProps: CalendarProps;
  inputTitle: string;
  inputProps: InputProps;
  onClickAway?: () => void;
}

const CalendarInput = ({
  inputTitle,
  inputProps,
  calendarProps,
  isCalenderOpen,
  onClickAway,
  ...props
}: CalendarInputProps) => {
  const calendarRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(4), shift(), flip()],
    whileElementsMounted: autoUpdate,
  });

  useClickAway(calendarRef, () => {
    if (typeof onClickAway === "function") {
      onClickAway();
    }
  });

  return (
    <Container {...props}>
      <InputGroup title={inputTitle} inputProps={inputProps} />
      <CalendarReference ref={refs.setReference}></CalendarReference>
      {isCalenderOpen && (
        <FloatingPortal id="portal">
          <CalendarWrapper ref={refs.setFloating} style={floatingStyles}>
            <Calendar
              ref={calendarRef}
              {...calendarProps}
              prevLabel={<Icon icon="chevron_left" size="small" />}
              prev2Label={
                <Icon icon="keyboard_double_arrow_left" size="small" />
              }
              nextLabel={<Icon icon="chevron_right" size="small" />}
              next2Label={
                <Icon icon="keyboard_double_arrow_right" size="small" />
              }
            />
          </CalendarWrapper>
        </FloatingPortal>
      )}
    </Container>
  );
};

CalendarInput.displayName = "CalendarInput";

export default memo(CalendarInput);
