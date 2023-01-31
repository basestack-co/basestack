import styled, { css } from "styled-components";
import { rem } from "polished";
import { Button } from "@basestack/design-system";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5}
    ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s5};
  background-color: ${({ theme }) => theme.colors.gray800};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${rem("20px")};
  padding: ${({ theme }) => theme.spacing.s8};
  height: 425px;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 620px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
`;

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:active, :disabled) {
    background-color: rgba(255, 255, 255, 0.9);
    color: ${({ theme }) => theme.colors.black};
  }
`;

const illustrationStyles = css`
  display: flex;
  position: absolute;
  z-index: 0;
  opacity: 0.2;
`;

export const HalfPlanetIllustration = styled.div`
  ${illustrationStyles};
  right: 0;
  bottom: 0;
`;

export const PlanetIllustration = styled.div`
  ${illustrationStyles};
  left: -90px;
  top: -140px;
`;