import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.s5};
  max-width: ${rem("1100px")};
  width: 100%;

  @media screen and ${({ theme }) => theme.device.max.xl} {
    gap: ${({ theme }) => theme.spacing.s2};
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 374px) {
    grid-template-columns: 1fr;
  }
`;
