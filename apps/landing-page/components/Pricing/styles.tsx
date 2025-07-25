import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0;
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
  flex: 0 0 calc(100% / 4);

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

export const Span = styled.span``;
