import { rem } from "polished";
import styled, { css } from "styled-components";

const backgroundBlur = css`
  background: ${({ theme }) =>
    theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Container = styled.nav.withConfig({
  shouldForwardProp: (prop) => !["isSticky"].includes(prop),
})<{
  isSticky: boolean;
}>`
  z-index: 1001;
  ${({ isSticky }) =>
    isSticky
      ? css`
          position: sticky;
          top: 0;
        `
      : css`
          position: relative;
        `};
  display: flex;
  align-items: center;
  min-height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  transition: all 0.2s ease-in;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.isDarkMode
        ? theme.horizontalRule.backgroundColor
        : theme.horizontalRule.darker.backgroundColor};
  ${backgroundBlur};
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: ${rem("1400px")};
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.md} {
    display: none;
  }
`;

export const ListItem = styled.li`
  display: flex;
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const StyledButton = styled.button`
  display: inline-flex;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const IconButtonContainer = styled.ul`
  display: none;
  margin-right: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.md} {
    display: inline-flex;
  }
`;

export const Span = styled.span``;
