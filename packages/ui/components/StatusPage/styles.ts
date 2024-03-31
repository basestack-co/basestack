import styled, { css } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  ${flexColumn};
  min-height: 100vh;
`;

const containerStyles = css`
  ${flexColumn};
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export const ContentContainer = styled.div`
  ${containerStyles};
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6};
  text-align: center;
`;

export const Footer = styled.div`
  ${containerStyles};
  align-items: center;
  padding: ${({ theme }) =>
    `0 ${theme.spacing.s6} ${theme.spacing.s6} ${theme.spacing.s6}`};
`;
