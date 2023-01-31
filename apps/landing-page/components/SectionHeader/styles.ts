import styled, { css } from "styled-components";

export const Container = styled.div<{ hasMarginBottom: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: ${({ theme }) => theme.spacing.s7};
    `}
`;
