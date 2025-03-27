import styled from "styled-components";
import { rem } from "polished";
import { containerBlurStyles } from "../styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0 ${rem("80px")} 0;
  position: relative;
  ${containerBlurStyles}
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  margin-bottom: ${rem("100px")};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${rem("1440px")};
  width: 100%;
  margin: 0 auto;
`;

export const Embla = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const Indicators = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  height: 0;
`;

export const Indicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop),
})<{
  color: string;
}>`
  background: ${({ color }) => color};
  opacity: 0.5;
  border-radius: 50%;
  z-index: -2;
  height: ${rem("450px")};
  flex: 1;
  transition: background-color 0.2s ease-in-out;

  @media screen and ${({ theme }) => theme.device.max.md} {
    height: ${rem("350px")};
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    &:not(:first-child) {
      display: none;
    }
  }
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.s5} ${theme.spacing.s5} ${theme.spacing.s5}`};
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

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    align-items: center;
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;
