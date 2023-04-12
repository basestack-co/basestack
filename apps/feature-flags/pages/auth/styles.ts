import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: grid;
  grid-template-columns: ${rem("400px")} 1fr;
  height: 100vh;

  @media screen and ${({ theme }) => theme.device.max.lg} {
    display: flex;
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: ${({ theme }) => theme.spacing.s6};
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")};
  max-width: ${rem("800px")};

  @media screen and ${({ theme }) => theme.device.max.xl} {
    padding: ${rem("100px")} ${({ theme }) => theme.spacing.s8};
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: ${({ theme }) => theme.spacing.s6};
  }
`;

export const CardsList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    margin-top: ${({ theme }) => theme.spacing.s6};
  }
`;

export const CardsItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s5};
  }
`;
