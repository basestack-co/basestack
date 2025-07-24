import { rem } from "polished";
import styled, { css, keyframes } from "styled-components";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  ${flexColumn};
  height: 100vh;
  position: relative;
  padding: ${({ theme }) => theme.spacing.s5};
  background-color: ${({ theme }) => theme.splash.backgroundColor};
  align-items: center;
  overflow: hidden;
`;

export const Content = styled.div`
  ${flexColumn};
  align-items: center;
  margin-top: ${rem("120px")};
`;

const loadingAnimation = keyframes`
  0% {
    left: 0;
    transform: translateX(-10%);
  }
  100% {
    left: 100%;
    transform: translateX(-90%);
  }
`;

export const LoaderContainer = styled.div`
  ${flexColumn};
  width: ${rem("200px")};
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const Loader = styled.div`
  width: 100%;
  height: 2px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.splash.loader.backgroundColor};
  border-radius: 2px;

  &::after {
    content: "";
    width: ${rem("80px")};
    height: 2px;
    border-radius: 1px;
    background: ${({ theme }) => theme.splash.loader.color};
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: ${loadingAnimation} 0.8s ease-in-out infinite alternate;
  }
`;
