import styled from "styled-components";
import { space } from "styled-system";
import { rem, transparentize } from "polished";
import { BannerVariant } from "./types";

export const Container = styled.div<{ variant: BannerVariant; bg: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ bg }) => bg};
  border-radius: 4px;
  ${space};
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: ${rem("56px")};
  padding: ${({ theme }) => theme.spacing.s3};
  padding-left: ${({ theme }) => theme.spacing.s4};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;
  padding-left: ${({ theme }) => theme.spacing.s3};
`;

export const Button = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${rem("32px")};
  width: ${rem("32px")};
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => transparentize(0.8, theme.colors.white)};
  }
`;
