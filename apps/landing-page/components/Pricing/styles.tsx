import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1480px")};
  width: 100%;
  margin: 0 auto;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  margin: ${({ theme }) => theme.spacing.s8} 0
    ${({ theme }) => theme.spacing.s5} 0;
`;

export const FloatingLabel = styled.div`
  display: inline-flex;
  position: absolute;
  top: ${rem("-20px")};
  left: 0;
`;

export const Card = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5};
  padding-bottom: ${rem("22px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s3};
  }
`;

export const Embla = styled.div`
  max-width: 100%;
  margin: auto;
`;

export const EmblaViewport = styled.ul`
  overflow: hidden;
  padding: 0 20px 8px 20px;
`;

export const EmblaContainer = styled.ul`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: ${rem("-20px")};
`;

export const EmblaSlide = styled.li`
  min-width: 0;
  padding-left: ${rem("20px")};
  flex: 0 0 calc(100% / 4);

  @media screen and ${({ theme }) => theme.device.max.xl} {
    flex: 0 0 calc(100% / 3);
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex: 0 0 calc(100% / 2);
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex: 0 0 100%;
  }
`;
