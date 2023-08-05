import styled from "styled-components";
import { SpaceProps, space } from "styled-system";

export const Container = styled.div<SpaceProps>`
  ${space};
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
