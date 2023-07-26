import styled, { keyframes, css } from "styled-components";
import { rem } from "polished";

const pulsate = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

const flexRow = css`
  display: flex;
  flex-direction: row;
`;

const getValue = (value: number | string) =>
  typeof value === "string" ? value : rem(`${value}px`);

export const Container = styled.div<{
  backgroundColor?: string;
  padding?: number | string;
  hasShadow?: boolean;
  marginBottom: number;
}>`
  ${flexColumn};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.skeleton.backgroundColor};
  border-radius: ${rem("4px")};
  padding: ${({ theme, padding }) => getValue(padding || theme.spacing.s5)};

  ${({ hasShadow, theme }) =>
    hasShadow &&
    css`
      box-shadow: ${theme.shadow.elevation2};
    `}

  &:not(:last-child) {
    margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  }
`;

export const Wrapper = styled.div<{ displayInline?: boolean }>`
  ${({ displayInline }) => (displayInline ? flexRow : flexColumn)};
  animation: ${pulsate} 1.2s infinite linear;
`;

export const Item = styled.div<{
  height: number;
  width: number | string;
  marginBottom?: number | string;
  marginRight?: number | string;
  marginLeft?: number | string;
  isRound?: boolean;
}>`
  ${flexColumn};
  background-color: ${({ theme }) => theme.skeleton.color};
  height: ${({ height }) => rem(`${height}px`)};
  width: ${({ width }) => getValue(width || 0)};
  margin-bottom: ${({ marginBottom }) => getValue(marginBottom || 0)};
  margin-right: ${({ marginRight }) => getValue(marginRight || 0)};
  margin-left: ${({ marginLeft }) => getValue(marginLeft || 0)};
  border-radius: ${({ isRound }) => (isRound ? "50%" : rem("6px"))};
  flex-shrink: ${({ width }) =>
    typeof width === "string" && width.includes("%") ? "initial" : 0};
`;
