import React, { memo } from "react";
// Calendar
// @ts-ignore
import Calendar, { CalendarProps } from "react-calendar";
// Components
import { Container } from "./styles";
import Icon from "../Icon";

const CalendarComp = (props: CalendarProps) => (
  <Container>
    <Calendar
      {...props}
      prevLabel={<Icon icon="chevron_left" size="small" />}
      prev2Label={<Icon icon="keyboard_double_arrow_left" size="small" />}
      nextLabel={<Icon icon="chevron_right" size="small" />}
      next2Label={<Icon icon="keyboard_double_arrow_right" size="small" />}
    />
  </Container>
);

export default memo(CalendarComp);
