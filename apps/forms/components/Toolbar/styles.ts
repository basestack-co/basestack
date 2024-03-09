import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing.s5} 0;
  gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-wrap: wrap;
  }
`;
