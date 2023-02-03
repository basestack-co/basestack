import styled, { css, keyframes } from "styled-components";
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

const indicatorAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

export const CardContainer = styled.button<{ isActive: boolean }>`
  position: relative;
  border: none;
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray50};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s5}
    ${rem("25px")} ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  cursor: pointer;
  transition: scale 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    scale: 1.05;
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        animation: ${indicatorAnimation} 10s linear;
        height: 5px;
        background-color: ${theme.colors.primary};
      }
    `}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;
