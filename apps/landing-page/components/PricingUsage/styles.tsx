import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const HeaderContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    padding-top: 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.s8};
  max-width: ${rem("1100px")};
  width: 100%;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: 1fr;
  }
`;
