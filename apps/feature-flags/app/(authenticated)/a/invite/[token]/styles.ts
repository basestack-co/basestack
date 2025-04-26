import styled from "styled-components";

export const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
  max-width: 616px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.s5};
  margin-top: ${({ theme }) => theme.spacing.s8};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s2};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    width: 100%;
    button {
      width: 50%;
      justify-content: center;
    }
  }
`;
