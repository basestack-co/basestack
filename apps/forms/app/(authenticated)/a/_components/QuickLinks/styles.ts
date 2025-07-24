import { rem } from "polished";
import styled, { css } from "styled-components";
import {
  compose,
  FlexboxProps,
  flexbox,
  LayoutProps,
  layout,
  SpaceProps,
  space,
} from "styled-system";

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

export const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "alignItems",
})<BoxProps>`
  ${compose(layout, space, flexbox)};
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
