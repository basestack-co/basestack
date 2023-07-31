import styled from "styled-components";
import { scrollbar } from "@basestack/design-system/styles";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 992px;
  margin: 0 auto;
  width: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
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

export const ProjectsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s3};
  max-height: 244px;
  overflow: auto;
  ${scrollbar};
`;

export const ProjectsListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export const ProjectButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.s3};
  background-color: ${({ theme }) =>
    theme.colors[theme.isDarkMode ? "gray700" : "gray50"]};

  &:hover:not(:active) {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray100"]};
  }
`;
