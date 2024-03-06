import styled, { css } from "styled-components";
import { rem } from "polished";
import {
  compose,
  layout,
  space,
  flexbox,
  LayoutProps,
  SpaceProps,
  FlexboxProps,
} from "styled-system";

const flexCenter = css`
  display: flex;
  align-items: center;
`;

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div<BoxProps>`
  ${compose(layout, space, flexbox)};
`;

export const HeaderGrid = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

export const HeaderButton = styled.button`
  ${flexCenter};
  overflow: hidden;
  flex-grow: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) =>
    `${theme.spacing.s4} ${theme.spacing.s5} ${theme.spacing.s4} 0`};
`;

export const HeaderCell = styled.div`
  ${flexCenter};
  padding-right: ${({ theme }) => theme.spacing.s5};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    top: calc(50% - 10px);
    right: -1px;
    width: 2px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray100"]};
  }
`;

export const HeaderRight = styled.div`
  ${flexCenter};
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.s3};
  width: 100%;
  max-width: 180px;
`;

export const BodyContainer = styled.div`
  overflow: hidden;
  padding-right: ${({ theme }) => theme.spacing.s5};
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};
  padding: ${({ theme }) =>
    `${theme.spacing.s5} ${theme.spacing.s5} ${theme.spacing.s5} ${rem("62px")}`};
`;

export const BodyValue = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray700" : "gray10"]};
  margin-top: ${({ theme }) => theme.spacing.s1};
  padding: ${({ theme }) => theme.spacing.s2};
`;

export const ActionsList = styled.ul`
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const ActionsListItem = styled.li`
  display: flex;
`;
