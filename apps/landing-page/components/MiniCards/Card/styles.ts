import styled from "styled-components";
import { rem } from "polished";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  cursor: default;

  &:hover {
    .inner-content {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  .icon-box {
    height: 58px;
    width: 58px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InnerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  inset: 1px;
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5};
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s ease-in-out;
`;
