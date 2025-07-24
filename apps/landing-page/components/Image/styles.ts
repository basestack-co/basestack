import { rem } from "polished";
import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div`
  ${space};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray900 : theme.colors.gray50};
  box-shadow: ${({ theme }) => theme.shadow.elevation4};
  border-radius: ${rem("8px")};
  width: 100%;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
