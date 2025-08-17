import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.md} {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    gap: ${({ theme }) => theme.spacing.s3};
  }
`;
