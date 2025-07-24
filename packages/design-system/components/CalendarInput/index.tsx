import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { rem } from "polished";
import React, { memo, useRef } from "react";
// Calendar
import type { CalendarProps } from "react-calendar";
import { useClickAway } from "react-use";
import type { LayoutProps, SpaceProps } from "styled-system";
import Calendar from "../Calendar";
import Icon from "../Icon";
import IconButton from "../IconButton";
import type { InputProps } from "../Input";
import InputGroup from "../InputGroup";
// Components
import {
  CalendarReference,
  CalendarWrapper,
  Container,
  InputContainer,
} from "./styles";

export interface CalendarInputProps extends SpaceProps, LayoutProps {
  isCalenderOpen: boolean;
  calendarProps: CalendarProps;
  inputTitle?: string;
  inputProps: InputProps;
  onClickAway?: () => void;
  showClearButton?: boolean;
  onClear?: () => void;
}

const CalendarInput = ({
  inputTitle,
  inputProps,
  calendarProps,
  isCalenderOpen = false,
  onClickAway,
  onClear,
  showClearButton = false,
  ...props
}: CalendarInputProps) => {
  const calendarRef = useRef(null);

  const { refs, floatingStyles } = useFloating({
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
      <InputContainer>
        <InputGroup title={inputTitle} inputProps={inputProps} />
        {showClearButton && onClear && (
          <IconButton
            position="absolute"
            right={rem("6px")}
            top={rem("6px")}
            icon="close"
            onClick={onClear}
          />
        )}
      </InputContainer>
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
