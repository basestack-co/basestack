import styled, { css } from "styled-components";
import { space } from "styled-system";
import { Text } from "../../atoms";
import { Type } from "./types";

export const Container = styled.div<{
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

export const Wrapper = styled.div<{ type: Type }>`
  display: flex;
  position: relative;

  ${({ theme, type }) =>
    type !== "created" &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 45px;
        left: 19px;
        bottom: -19px;
        width: 2px;
        background-color: ${theme.colors.gray100};
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
  background-color: ${({ theme }) => theme.colors.gray100};
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`;

export const Description = styled(Text)`
  font-weight: 400;
`;

export const StyledText = styled(Text)<{ type: Type }>`
  ${({ type }) =>
    type === "deleted" &&
    css`
      text-decoration: line-through;
    `}
`;
