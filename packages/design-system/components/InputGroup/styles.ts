import styled from "styled-components";
import { space } from "styled-system";

export const Container = styled.div`
  ${space};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s2};
`;
