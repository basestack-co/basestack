import styled from "styled-components";
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

export const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding-left: ${({ theme }) => theme.spacing.s2};
  gap: ${({ theme }) => theme.spacing.s5};
`;

export const Circles = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s2};
`;

export const Circle = styled.div<{ color: string }>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const CodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  border-radius: ${rem("8px")};
  overflow: hidden;
  font-size: ${rem("16px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  background: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  padding: 0 ${({ theme }) => theme.spacing.s5}
    ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s5};

  pre {
    min-height: 362px;
    border-radius: 4px;
    padding: 0 !important;
    background: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.gray800 : theme.colors.white} !important;
  }
`;
