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
  max-width: 1100px;
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.s8} auto;
`;

export const CardContainer = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s5};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: scale 0.2s ease-in-out;

  &:hover {
    scale: 1.05;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;
