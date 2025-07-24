import { scrollbar } from "@basestack/design-system/styles";
import { rem } from "polished";
import styled, { css } from "styled-components";
import {
  compose,
  type FlexboxProps,
  flexbox,
  type LayoutProps,
  layout,
  type SpaceProps,
  space,
} from "styled-system";

const flexCenter = css`
  display: flex;
  align-items: center;
`;

type BoxProps = LayoutProps & SpaceProps & FlexboxProps;

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["alignItems", "flexDirection", "minWidth"].includes(prop),
})<BoxProps>`
  ${compose(layout, space, flexbox)};
`;

export const HeaderGrid = styled.div<{ columns: number }>`
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

export const HeaderButton = styled.div`
  ${flexCenter};
  min-height: 68px;
  overflow: hidden;
  flex-grow: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) =>
    `${theme.spacing.s4} ${theme.spacing.s5} ${theme.spacing.s4} 0`};
`;

export const HeaderCell = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasBorder",
})<{ hasBorder: boolean }>`
  ${flexCenter};
  text-align: left;
  padding-right: ${({ theme }) => theme.spacing.s5};
  position: relative;
  ${({ hasBorder }) =>
    hasBorder &&
    css`
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
    `}
`;

export const HeaderRight = styled.div`
  ${flexCenter};
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.min.sm} {
    width: 100%;
    max-width: 220px;
  }
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
  max-height: 500px;
  ${scrollbar};
  overflow-y: auto;
`;

export const MetadataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s4};
`;

export const MetadataTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.s1};
  gap: ${({ theme }) => theme.spacing.s1};
  align-items: center;
`;

export const BodyValue = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray700" : "gray50"]};
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

export const MobileLabels = styled.div`
  padding: ${({ theme }) =>
    `0 ${theme.spacing.s5} ${theme.spacing.s4} ${rem("62px")}`};
`;
