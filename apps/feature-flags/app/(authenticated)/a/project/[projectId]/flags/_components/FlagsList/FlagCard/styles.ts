import { rem } from "polished";
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

export const DropdownWrapper = styled.div`
  position: absolute;
  right: ${rem("14px")};
  top: ${rem("14px")};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;
