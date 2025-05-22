import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputGroupContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${rem("4px")};
  gap: ${({ theme }) => theme.spacing.s2};
  margin: ${({ theme }) => theme.spacing.s2} 0
    ${({ theme }) => theme.spacing.s6} 0;
`;

export const InputGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const MembersList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing.s2};
  gap: ${({ theme }) => theme.spacing.s4};
`;

export const MembersListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s4};
`;

export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
