import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;
