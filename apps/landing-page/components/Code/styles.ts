import styled from "styled-components";
import { rem } from "polished";

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
  align-items: center;
  max-width: ${rem("1440px")};
  width: 100%;
  margin: 0 auto;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: none;
  padding: ${({ theme }) => theme.spacing.s6};
  border-radius: ${rem("8px")};
  transition: all 0.2s ease-in-out;
  fill: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray300 : theme.colors.black};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
`;

export const Embla = styled.div`
  max-width: ${rem("1140px")};
  width: 100%;
  margin: 0 auto;
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.spacing.s5}
    ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
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
