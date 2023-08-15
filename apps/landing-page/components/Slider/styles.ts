import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export const CardsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s5};
  max-width: ${rem("1140px")};
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.s5}
    ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding: ${({ theme }) => theme.spacing.s5};

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex: 1 0 0;

  @media screen and ${({ theme }) => theme.device.max.md} {
    min-width: 320px;
    scroll-snap-align: start;
  }
`;

export const SlideCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;
