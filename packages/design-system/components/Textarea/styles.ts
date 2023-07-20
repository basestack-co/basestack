import styled from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";

export const StyledTextarea = styled.textarea<{
  isDarker: boolean;
}>`
  ${space};
  border: none;
  background-color: ${({ theme, isDarker }) =>
    isDarker ? theme.colors.gray100 : theme.colors.gray50};
  min-height: ${rem("150px")};
  max-height: ${rem("500px")};
  min-width: 100%;
  max-width: 100%;
  border-radius: ${rem("4px")};
  font-size: ${rem("14px")};
  font-weight: 400;
  width: 100%;
  padding: ${rem("16px")};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.black};
  }
`;
