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
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    justify-content: initial;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    margin-top: ${({ theme }) => theme.spacing.s6};
    order: 1;
  }
`;

export const LeftColumnContent = styled.div`
  display: flex;
  align-items: center;

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex-direction: column;
    align-items: initial;
    justify-content: center;
  }
`;

export const CopyWrightContainer = styled.div`
  display: inline-flex;
  height: ${rem("36px")};
  align-items: center;

  @media screen and ${({ theme }) => theme.device.max.lg} {
    margin: ${({ theme }) => theme.spacing.s2} 0;
  }
`;

export const List = styled.ul`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex-direction: column;
    margin-left: 0;
  }
`;

export const ListItem = styled.li`
  display: inline-flex;
  height: ${rem("36px")};
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s4};
  margin-right: ${({ theme }) => theme.spacing.s2};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    padding: 0;
    margin: 0 0 ${({ theme }) => theme.spacing.s2} 0;
  }
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
  font-size: ${rem("16px")};
  height: ${rem("42px")};
  width: 100%;
  border-radius: ${rem("4px")};
  border: none;
  margin-right: ${({ theme }) => theme.spacing.s3};
  padding: 0 ${({ theme }) => theme.spacing.s4};
  color: ${({ theme }) => theme.colors.gray50};
  background-color: ${({ theme }) => theme.colors.gray700};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.gray500};
  }
`;
