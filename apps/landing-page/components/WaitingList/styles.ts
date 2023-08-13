import styled, { css } from "styled-components";
import { Text } from "@basestack/design-system";
import { rem } from "polished";

const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.section`
  ${flexColumn};
  min-height: 100vh;
  position: relative;
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
  ${flexColumn};
  flex-grow: 1;
  max-width: ${rem("1440px")};
  width: 100%;
  margin: 0 auto;
`;

export const Header = styled.div`
  ${flexColumn};
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5}
    0 ${({ theme }) => theme.spacing.s5};
`;

export const TextContainer = styled.div`
  ${flexColumn};
  max-width: 50%;
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.xl} {
    max-width: 80%;
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    max-width: 100%;
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    h1 {
      font-size: 42px;
    }

    p {
      font-size: 20px;
    }
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 18px;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, ${rem("420px")}) 1fr;
  grid-gap: ${({ theme }) => theme.spacing.s3};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: 1fr;
  }

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-gap: ${({ theme }) => theme.spacing.s6};
  }
`;

export const LeftCol = styled.div`
  ${flexColumn};
`;

export const InputContainer = styled.div`
  ${flexColumn};
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

export const InputWrapper = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  ${flexColumn};
  padding: 0 ${({ theme }) => theme.spacing.s5};
  position: relative;

  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    position: absolute;
    border-radius: 50%;
    z-index: -2;
    height: 500px;
    width: 500px;
    right: 20px;
    top: -150px;
  }
`;

export const Input = styled.input`
  font-size: ${rem("16px")};
  height: ${rem("42px")};
  width: 100%;
  max-width: ${rem("320px")};
  border-radius: ${rem("4px")};
  margin-right: ${({ theme }) => theme.spacing.s3};
  padding: 0 ${({ theme }) => theme.spacing.s4};
  color: ${({ theme }) => theme.colors.gray900};
  border: 2px solid ${({ theme }) => theme.colors.gray600};
  background-color: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.gray300};
  }
`;

export const ErrorContainer = styled.div`
  height: 0;
  position: relative;
`;

export const ErrorText = styled(Text)`
  position: absolute;
  top: ${rem("4px")};
  left: 0;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};
  margin-top: ${({ theme }) => theme.spacing.s6};
  padding: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    flex-direction: row;
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    width: 100vw;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-padding: ${({ theme }) => theme.spacing.s5};

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex: 1 0 0;

  @media screen and ${({ theme }) => theme.device.max.md} {
    min-width: 320px;
    scroll-snap-align: start;
  }
`;

export const Footer = styled.div`
  ${flexColumn};
  padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  margin-top: auto;
`;
