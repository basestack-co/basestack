import { forwardRef, memo } from "react";
// Calendar
import Calendar, { type CalendarProps } from "react-calendar";
import Icon from "../Icon";
// Components
import { Container } from "./styles";

const CalendarComp = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  return (
    <Container ref={ref}>
      <Calendar
        {...props}
        prevLabel={<Icon icon="chevron_left" size="small" />}
        prev2Label={<Icon icon="keyboard_double_arrow_left" size="small" />}
        nextLabel={<Icon icon="chevron_right" size="small" />}
        next2Label={<Icon icon="keyboard_double_arrow_right" size="small" />}
      />
    </Container>
  );
});

CalendarComp.displayName = "CalendarComp";

export default memo(CalendarComp);
