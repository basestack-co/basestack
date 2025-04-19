import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s2};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
