import styled from "styled-components";
import { compose, layout, space } from "styled-system";

export const Container = styled.div`
  ${compose(space, layout)};
  display: flex;
  flex-direction: column;
`;

export const CalendarReference = styled.div`
  height: 0;
  pointer-events: none;
`;

export const CalendarWrapper = styled.div`
  z-index: ${({ theme }) => theme.zIndex.calendar};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
