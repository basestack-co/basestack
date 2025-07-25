import { rem } from "polished";
import styled from "styled-components";

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
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue500" : "primary"]};
  padding: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: ${({ theme }) => theme.spacing.s6};
  }
`;

export const RightContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  &::before {
    content: "";
    background: rgba(238, 238, 238, 0.7);
    -webkit-backdrop-filter: saturate(180%) blur(150px);
    backdrop-filter: saturate(180%) blur(150px);
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.7;
  }
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
