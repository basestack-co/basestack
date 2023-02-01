import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.gray700 : theme.colors.white};
  border: 1px solid
    ${({ theme, isDarkMode }) =>
      isDarkMode ? theme.colors.gray600 : theme.colors.gray100};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const ImageContainer = styled.div`
  height: 180px;
`;
