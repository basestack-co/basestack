import styled from "styled-components";
import { rem } from "polished";
import { space } from "styled-system";

export const Container = styled.div`
  ${space};
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray50};
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.2);
  border-radius: ${rem("20px")};
  width: 100%;
  overflow: hidden;
  max-width: 1100px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
