import styled, { css } from "styled-components";
import {
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";
import { rem } from "polished";

const flexCenter = css`
  display: flex;
  align-items: center;
`;

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div<BoxProps>`
  ${compose(layout, space, flexbox)};
`;

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
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

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.xl} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

export const ListItem = styled.li`
  position: relative;
  ${flexColumn};
`;

export const CardButton = styled.button`
  ${flexColumn};
  flex-grow: 1;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;
