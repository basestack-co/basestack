import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";

export const Container = styled.div`
  ${space};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${rem("6px")};
`;
