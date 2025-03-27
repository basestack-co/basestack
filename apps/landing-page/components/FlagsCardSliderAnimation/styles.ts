import styled from "styled-components";
import { rem } from "polished";
import { space, SpaceProps } from "styled-system";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const ProjectCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
`;

export const Box = styled.div<SpaceProps>`
  display: flex;
  flex-direction: column;
  ${space};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
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
  padding-left: ${rem("10px")};
  flex: 0 0 240px;
`;
