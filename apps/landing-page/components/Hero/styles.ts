import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    background: rgba(238, 238, 238, 0.7);
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

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1440px")};
  width: 100%;
  margin: 0 auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    position: absolute;
    border-radius: 50%;
    z-index: -2;
    height: 500px;
    width: 500px;
    left: -250px;
    top: -150px;
  }
`;
