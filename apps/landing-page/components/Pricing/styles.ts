import styled from "styled-components";
import { rem } from "polished";
import { Button } from "@basestack/design-system";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1440px")};
  width: 100%;
  margin: 0 auto;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};
  max-width: 780px;
  width: 100%;

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
`;

export const CardContainer = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme, isDark }) =>
    isDark ? theme.colors.gray700 : theme.colors.white};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
`;

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:active, :disabled) {
    background-color: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.s6} 0;
`;

export const ListItem = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s3};
  }
`;
