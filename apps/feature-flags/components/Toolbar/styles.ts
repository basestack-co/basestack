import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export const Container = styled.header<SpaceProps>`
  ${space};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

export const SegmentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and ${({ theme }) => theme.device.min.lg} {
    grid-column: 2 / 5;
  }
`;
