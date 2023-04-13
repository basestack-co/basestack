import styled, { css } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  ${flexColumn};
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  ${flexColumn};
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.s6};
  text-align: center;
`;
