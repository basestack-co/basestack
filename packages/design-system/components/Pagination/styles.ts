import styled from "styled-components";
import { space } from "styled-system";
import Text from "../Text";

export const Container = styled.div`
  ${space};
  display: flex;
  align-items: center;
`;

export const StyledText = styled(Text)`
  ${space};
  display: flex;
  font-weight: 500;
`;

export const Number = styled.div<{ highlight?: boolean }>`
  background-color: ${({ theme }) => theme.pagination.number.backgroundColor};
  height: 32px;
  min-width: 32px;
  padding: 0 ${({ theme }) => theme.spacing.s2};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
