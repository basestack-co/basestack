import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export const AccordionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
