import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const Text = styled.div`
  font-family: ${({ theme }) => theme.typography.robotoMono};
  font-size: ${rem("18px")};
  font-weight: 400;
  white-space: pre;
  color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray300 : theme.colors.black};
`;

export const TextWrapper = styled.span``;
