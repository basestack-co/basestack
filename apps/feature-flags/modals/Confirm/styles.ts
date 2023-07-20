import styled from "styled-components";
import { rem } from "polished";
import { space, SpaceProps } from "styled-system";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Content = styled.p<SpaceProps>`
  ${space};
  word-break: break-all;
  font-size: ${rem("14px")};
  line-height: ${rem("22px")};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray500};

  b {
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
  }
`;
