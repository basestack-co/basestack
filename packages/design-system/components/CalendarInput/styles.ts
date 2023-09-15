import styled from "styled-components";
import { space, compose, layout } from "styled-system";

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
