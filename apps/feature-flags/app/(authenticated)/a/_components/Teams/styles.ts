import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { rem } from "polished";

export const Section = styled.section<SpaceProps>`
  display: flex;
  flex-direction: column;
  ${space};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
  min-height: ${rem("36px")};
`;

export const TeamsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;
