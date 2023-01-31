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

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};
  width: 100%;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const ImageContainer = styled.div`
  height: 180px;
`;
