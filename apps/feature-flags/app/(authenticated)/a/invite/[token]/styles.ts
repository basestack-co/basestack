import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  width: 100%;
  position: relative;

  &::before {
    content: "";
    background: ${({ theme }) =>
      theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
    -webkit-backdrop-filter: saturate(180%) blur(150px);
    backdrop-filter: saturate(180%) blur(150px);
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Wrapper = styled.main`
  max-width: 576px;
  margin: 0 auto;
  width: 100%;
  position: relative;

  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    position: absolute;
    border-radius: 50%;
    z-index: -2;
    height: 250px;
    width: 250px;
    left: calc(50% - 125px);
    top: 0;
  }
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
