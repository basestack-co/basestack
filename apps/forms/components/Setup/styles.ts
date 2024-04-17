import styled from "styled-components";
import {
  space,
  compose,
  layout,
  flexbox,
  SpaceProps,
  FlexboxProps,
  LayoutProps,
} from "styled-system";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div<BoxProps>`
  ${compose(layout, space, flexbox)};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.s5};
`;
