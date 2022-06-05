import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s5};
`;
