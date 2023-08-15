import styled from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";

export const Container = styled.div`
  ${space};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray50};
  box-shadow: ${({ theme }) => theme.shadow.elevation6};
  border-radius: ${rem("8px")};
  width: 100%;
  overflow: hidden;
  max-width: ${rem("1100px")};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
