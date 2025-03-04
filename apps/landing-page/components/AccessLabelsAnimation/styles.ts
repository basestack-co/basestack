import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.s4};
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.s2};
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing.s2};
`;

export const LabelContainer = styled.div`
  display: inline-flex;
`;

export const ButtonContainer = styled.div`
  button,
  button:hover {
    background-color: ${({ theme }) =>
      theme.isDarkMode
        ? theme.colors.gray600
        : theme.colors.gray300} !important;
  }
`;
