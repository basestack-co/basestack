import styled from "styled-components";

export const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
  gap: ${({ theme }) => theme.spacing.s1};
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

export const PopupWrapper = styled.div`
  height: 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;
