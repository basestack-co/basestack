import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.gray700 : theme.colors.white};
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
`;

export const ImageContainer = styled.div`
  height: 180px;
`;
