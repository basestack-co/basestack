import styled from "styled-components";
import {
  compose,
  FlexboxProps,
  flexbox,
  LayoutProps,
  layout,
  SpaceProps,
  space,
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

export const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1 0 0;
`;
