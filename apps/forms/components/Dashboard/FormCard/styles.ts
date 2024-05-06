import styled from "styled-components";
import { rem } from "polished";

export const ListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Content = styled.div`
  margin-bottom: auto;
  padding: ${({ theme }) => theme.spacing.s5};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.s4};
  row-gap: ${({ theme }) => theme.spacing.s3};
  padding: ${({ theme }) => theme.spacing.s2} ${({ theme }) => theme.spacing.s5};
  min-height: ${rem("46px")};
`;

export const DetailContainer = styled.li`
  display: flex;
  align-items: center;
`;
