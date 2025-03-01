import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s2};
`;

export const Labels = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing.s2};

  &:first-child {
    padding-right: ${rem("100px")};
  }

  &:nth-child(2) {
    padding-left: ${rem("50px")};
  }

  &:last-child {
    padding-left: ${rem("100px")};
  }
`;
