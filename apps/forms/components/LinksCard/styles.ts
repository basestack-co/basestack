import styled from "styled-components";
import {
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

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
