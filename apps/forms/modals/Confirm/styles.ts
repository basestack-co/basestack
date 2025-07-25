import { rem } from "polished";
import styled from "styled-components";
import { type SpaceProps, space } from "styled-system";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Content = styled.p<SpaceProps>`
  ${space};
  word-break: break-all;
  font-size: ${rem("14px")};
  line-height: ${rem("22px")};
  font-weight: 400;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray400" : "gray500"]};

  b {
    color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray300" : "black"]};
    font-weight: 500;
  }
`;
