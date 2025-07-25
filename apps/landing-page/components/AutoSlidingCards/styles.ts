import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0 ${rem("92px")} 0;
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s5};
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
  position: relative;
  padding: 0 ${({ theme }) => theme.spacing.s5};

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: ${rem("50px")};
    top: ${rem("-10px")};
    bottom: ${rem("-2px")};
    z-index: 10;
  }

  &::before {
    left: ${({ theme }) => theme.spacing.s5};
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors[theme.isDarkMode ? "gray900" : "gray50"]},
      transparent
    );
  }

  &::after {
    right: ${({ theme }) => theme.spacing.s5};
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.colors[theme.isDarkMode ? "gray900" : "gray50"]},
      transparent
    );
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: 0;

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    &::before,
    &::after {
      width: ${rem("30px")};
    }
  }
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding-bottom: ${({ theme }) => theme.spacing.s2};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: 0 ${({ theme }) => theme.spacing.s5}
      ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
  }
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
