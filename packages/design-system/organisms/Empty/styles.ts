import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${rem("6px")};
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  border-radius: ${rem("6px")};
  justify-content: center;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${rem("42px")};
  height: ${rem("42px")};
  background-color: ${({ theme }) => theme.colors.blue100};
  border-radius: 50%;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;
