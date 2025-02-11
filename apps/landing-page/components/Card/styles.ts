import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
`;
