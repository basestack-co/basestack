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

  pre {
    min-height: 360px;
    background: ${({ theme }) =>
      theme.isDarkMode ? theme.colors.gray800 : theme.colors.white} !important;
  }
`;
