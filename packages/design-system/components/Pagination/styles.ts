import styled from "styled-components";
import { space } from "styled-system";
import Text from "../Text";

export const Container = styled.div`
  ${space};
  display: flex;
  align-items: center;
`;

export const StyledText = styled(Text)`
  display: flex;
  font-weight: 500;
`;

export const Number = styled.div<{ highlight?: boolean }>`
  background-color: ${({ theme }) => theme.colors.gray100};
  height: 36px;
  min-width: 36px;
  padding: 0 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
