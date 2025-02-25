import styled from "styled-components";
import { rem } from "polished";

export const Embla = styled.div`
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  max-width: ${rem("1140px")};
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.s5} ${theme.spacing.s2} ${theme.spacing.s5}`};
`;

export const EmblaContainer = styled.ul`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: ${rem("-20px")};

  @media screen and ${({ theme }) => theme.device.max.xl} {
    margin-left: ${rem("-10px")};
  }
`;

export const EmblaSlide = styled.li`
  min-width: 0;
  padding-left: ${rem("20px")};
  flex: 0 0 calc(100% / 3);

  @media screen and ${({ theme }) => theme.device.max.xl} {
    flex: 0 0 calc(100% / 3);
    padding-left: ${rem("10px")};
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex: 0 0 calc(100% / 2);
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex: 0 0 100%;
  }
`;
