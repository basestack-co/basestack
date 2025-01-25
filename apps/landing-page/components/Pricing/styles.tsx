import styled, { css } from "styled-components";
import { rem } from "polished";

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
  align-items: flex-end;
  position: relative;
  margin: ${({ theme }) => theme.spacing.s8} 0
    ${({ theme }) => theme.spacing.s5} 0;
`;

export const FloatingLabel = styled.div`
  display: inline-flex;
  position: absolute;
  top: ${rem("-20px")};
  left: 0;
`;

export const Card = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  padding: ${({ theme }) => theme.spacing.s5};
  padding-bottom: ${rem("22px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.s5};
  width: 100%;

  @media screen and ${({ theme }) => theme.device.max.xl} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: 1fr;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.s3};
  }
`;
