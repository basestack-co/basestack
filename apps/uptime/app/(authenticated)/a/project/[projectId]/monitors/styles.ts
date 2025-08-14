import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;
