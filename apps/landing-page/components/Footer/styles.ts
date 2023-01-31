import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  background-color: ${({ theme }) => theme.colors.gray800};
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s5};
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftColumnContent = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s3};
`;

export const ListItem = styled.li`
  display: inline-flex;
  height: ${rem("36px")};
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s3};
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${rem("320px")};
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
`;

export const Input = styled.input`
  height: ${rem("36px")};
  width: 100%;
  border-radius: ${rem("4px")};
  border: none;
  margin-right: ${({ theme }) => theme.spacing.s3};
  padding: 0 ${({ theme }) => theme.spacing.s3};
  color: ${({ theme }) => theme.colors.gray50};
  background-color: ${({ theme }) => theme.colors.gray700};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;
