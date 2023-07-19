import styled from "styled-components";

export const Labels = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
  gap: ${({ theme }) => theme.spacing.s1};
`;

export const PopupWrapper = styled.div`
  height: 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

export const TooltipContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing.s2};
`;
