import styled, { css } from "styled-components";
import { rem } from "polished";
import { gradientBorderStyles } from "../styles";

const backgroundBlur = css`
  background: ${({ theme }) =>
    theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
`;

export const Container = styled.nav`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-shrink: 0;
  height: ${rem("64px")};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  ${backgroundBlur};
  ${gradientBorderStyles("bottom")};
`;

export const ContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;

  .icon-box {
    width: 36px;
    height: 36px;
  }
`;

export const List = styled.ul`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
`;

export const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
