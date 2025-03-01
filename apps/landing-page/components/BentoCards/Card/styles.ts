import styled, { css } from "styled-components";
import { rem } from "polished";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  cursor: default;
`;

const containerStyles = css`
  display: flex;
  flex-direction: column;
  border-radius: ${rem("8px")};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const ComponentContainer = styled.div`
  ${containerStyles};
  min-height: 360px;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray900 : theme.colors.gray50};
`;

export const ImageContainer = styled.div`
  ${containerStyles};
  max-height: 360px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${rem("8px")};
`;
