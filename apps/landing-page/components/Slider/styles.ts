import styled, { css } from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  max-width: ${rem("1440px")};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const Embla = styled.div<{ isImageSlider: boolean }>`
  margin: 0 auto;
  width: 100%;
  max-width: ${rem("1140px")};

  ${({ theme, isImageSlider }) =>
    isImageSlider &&
    css`
      margin-top: ${rem("12px")};
    `}
`;

export const EmblaViewport = styled.div<{ isImageSlider: boolean }>`
  ${({ theme, isImageSlider }) =>
    isImageSlider
      ? css`
          overflow: visible;
          padding: ${`0 ${theme.spacing.s5}`};
        `
      : css`
          overflow: hidden;
          padding: ${`0 ${theme.spacing.s5} ${theme.spacing.s2} ${theme.spacing.s5}`};
        `}
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

export const EmblaSlide = styled.li<{ isImageSlider: boolean }>`
  min-width: 0;
  padding-left: ${rem("20px")};

  ${({ theme, isImageSlider }) =>
    isImageSlider
      ? css`
          flex: 0 0 calc(100% / 3);
          @media screen and ${theme.device.max.xl} {
            flex: 0 0 calc(100% / 3);
            padding-left: ${rem("10px")};
          }

          @media screen and ${theme.device.max.lg} {
            flex: 0 0 calc(100% / 2);
          }

          @media screen and ${theme.device.max.sm} {
            flex: 0 0 100%;
          }
        `
      : css`
          flex: 0 0 100%;

          @media screen and ${theme.device.max.xl} {
            padding-left: ${rem("10px")};
          }
        `}
`;
