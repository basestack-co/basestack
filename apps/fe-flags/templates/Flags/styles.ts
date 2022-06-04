import styled from "styled-components";

export const FlagsCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const FlagsTableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s2};
`;
