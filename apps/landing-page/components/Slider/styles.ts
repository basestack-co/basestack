import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};
  max-width: 1100px;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.s8} auto;

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
`;
