import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { rem } from "polished";

const flexCenter = css`
  display: flex;
  align-items: center;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section<SpaceProps>`
  ${flexColumn};
  ${space};
`;

export const Header = styled.div`
  ${flexCenter};
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
  min-height: ${rem("36px")};
`;

export const Box = styled.div<SpaceProps>`
  ${flexColumn};
  ${space};
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

export const Row = styled.div`
  ${flexCenter};
`;

export const CardButton = styled.button`
  ${flexColumn};
  flex-grow: 1;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ListItem = styled.li`
  ${flexColumn};
`;
