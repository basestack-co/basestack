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

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
`;

export const RightList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-wrap: wrap;
  }
`;

export const SubMenuContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SubMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: inline-flex;
`;
