import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: flex;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s6};
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "blue300" : "primary"]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CodeContainer = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spacing.s5};
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  font-size: ${rem("14px")};

  pre {
    background: ${({ theme }) => theme.colors.gray700}!important;
  }
`;

export const CopyButtonContainer = styled.div`
  display: inline-flex;
  position: absolute;
  right: ${({ theme }) => theme.spacing.s3};
  top: ${({ theme }) => theme.spacing.s3};
`;
