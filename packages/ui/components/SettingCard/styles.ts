import styled from "styled-components";
import { transparentize } from "polished";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s5};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;
  margin-left: auto;
  padding-left: ${({ theme }) => theme.spacing.s3};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s5};
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 1px;
  border-radius: 8px 8px 0 0;
  z-index: 5;
  background-color: ${({ theme }) =>
    transparentize(0.3, theme.colors[theme.isDarkMode ? "gray800" : "white"])};
`;
