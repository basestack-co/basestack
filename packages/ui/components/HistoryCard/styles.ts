import styled, { css } from "styled-components";
import { space } from "styled-system";
import type { HistoryType } from "./types";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["hasPaddingTop", "hasPaddingBottom"].includes(prop),
})<{
  hasPaddingTop: boolean;
  hasPaddingBottom: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme, hasPaddingTop }) =>
    hasPaddingTop ? theme.spacing.s3 : 0};
  padding-bottom: ${({ theme, hasPaddingBottom }) =>
    hasPaddingBottom ? theme.spacing.s3 : 0};
  ${space};
`;

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["hasLeftLine"].includes(prop),
})<{ hasLeftLine?: boolean }>`
  display: flex;
  position: relative;

  ${({ theme, hasLeftLine }) =>
    hasLeftLine &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 45px;
        left: 19px;
        bottom: -19px;
        width: 2px;
        background-color: ${
          theme.colors[theme.isDarkMode ? "gray700" : "gray100"]
        };
      }
    `}
`;

export const IconContainer = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray700" : "gray100"]};
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`;

export const TitleContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["type"].includes(prop),
})<{ type: HistoryType }>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${({ type }) =>
    type === "deleted" &&
    css`
      p:last-child {
        text-decoration: line-through;
      }
    `}
`;

export const LabelsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s1};
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing.s1} 0;
`;

export const BottomContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
