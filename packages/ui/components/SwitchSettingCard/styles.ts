import styled from "styled-components";
import { transparentize } from "polished";

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 1px;
  z-index: 5;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    transparentize(0.3, theme.colors[theme.isDarkMode ? "gray800" : "white"])};
`;
