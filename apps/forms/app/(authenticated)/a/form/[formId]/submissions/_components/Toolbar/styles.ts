import styled from "styled-components";
import {
  compose,
  type FlexboxProps,
  flexbox,
  type LayoutProps,
  layout,
  type SpaceProps,
  space,
} from "styled-system";

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div<BoxProps>`
  ${compose(layout, space, flexbox)};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s5};
  margin-bottom: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 340px;
`;

export const RightList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-wrap: wrap;
  }
`;

export const ListItem = styled.li`
  display: inline-flex;
`;

export const PopupButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  button {
    transition: padding-right 0.1s linear;
  }
`;

export const PopupIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: ${({ theme }) => theme.spacing.s2};
`;
