import styled, { css } from "styled-components";
import { space } from "styled-system";
import { rem, transparentize } from "polished";

export type BannerVariant = "success" | "info" | "warning" | "danger";

export const Container = styled.div<{
  variant: BannerVariant;
  bg: string;
  borderRadius?: number;
  isTranslucent?: boolean;
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({ bg }) => bg};
  border-radius: ${({ borderRadius }) =>
    typeof borderRadius === "number" ? `${borderRadius}px` : "4px"};
  ${space};
`;

export const Wrapper = styled.div<{ maxWidth?: number }>`
  display: flex;
  align-items: center;
  min-height: ${rem("56px")};
  padding: ${({ theme }) => theme.spacing.s3};
  padding-left: ${({ theme }) => theme.spacing.s4};

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      width: 100%;
      max-width: ${`${maxWidth}px`};
      margin: 0 auto;
    `}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

export const RightContentWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing.s3};
`;

export const Button = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${rem("32px")};
  width: ${rem("32px")};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.white)};
  }
`;
