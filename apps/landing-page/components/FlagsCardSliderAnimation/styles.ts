import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const Embla = styled.div`
  width: 100%;
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
`;

export const EmblaContainer = styled.ul`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: ${rem("-10px")};
`;

export const EmblaSlide = styled.li`
  min-width: 0;
  display: flex;
  padding-left: ${rem("10px")};
  flex: 0 0 240px;
`;
