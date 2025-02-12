import styled, { css, keyframes } from "styled-components";
import { rem } from "polished";

const indicatorAnimation = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
`;

export const CardContainer = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["alignItems", "animationTime", "isActive"].includes(prop),
})<{
  isActive: boolean;
  animationTime: number;
}>`
  position: relative;
  border: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s5}
    ${rem("25px")} ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  cursor: pointer;
  transition: scale 0.2s ease-in-out;
  overflow: hidden;

  ${({ theme, isActive }) =>
    theme.isDarkMode
      ? css`
          background-color: ${isActive
            ? theme.colors.gray800
            : theme.colors.gray900};
        `
      : css`
          background-color: ${isActive
            ? theme.colors.white
            : theme.colors.gray50};
        `};

  ${({ isActive, theme, animationTime }) =>
    isActive &&
    css`
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        animation: ${indicatorAnimation} ${`${animationTime}s`} linear;
        height: 5px;
        background-color: ${theme.isDarkMode
          ? theme.colors.blue300
          : theme.colors.primary};
      }
    `}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;
