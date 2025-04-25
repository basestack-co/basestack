import styled from "styled-components";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 992px;
  margin: 0 auto;
  width: 100%;
`;
