import styled from "styled-components";
import { rem } from "polished";
import { containerBlurStyles, ImageContainer } from "../styles";

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
  z-index: 1;
  overflow: hidden;
  ${containerBlurStyles};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s4};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;

export const StyledImageContainer = styled(ImageContainer)`
  margin-top: ${rem("100px")};
  aspect-ratio: 1.482;
  width: 100%;
`;
