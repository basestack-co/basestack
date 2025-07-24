import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isButton",
})<{ isButton: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: none;
  background-color: transparent;
  cursor: ${({ isButton }) => (isButton ? "pointer" : "initial")};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s5};
  margin-bottom: auto;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s4};
  row-gap: ${({ theme }) => theme.spacing.s3};
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
  min-height: ${rem("46px")};
`;

export const Avatars = styled.ul`
  display: flex;
  align-items: center;
`;

export const AvatarListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>`
  border: 2px solid
    ${({ theme }) =>
      theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: 50%;
  margin-left: ${rem("-12px")};
  position: relative;
  z-index: ${({ index }) => index};

  &:first-child {
    margin-left: 0;
  }
`;

export const PopupMenuWrapper = styled.div`
  position: absolute;
  right: ${rem("14px")};
  top: ${rem("14px")};
`;

export const TooltipContainer = styled.div`
  margin-left: auto;
`;

export const DetailContainer = styled.div`
  display: flex;
  align-items: center;
`;
