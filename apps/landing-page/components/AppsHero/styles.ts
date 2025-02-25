import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} 0;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.s5};
  max-width: ${rem("1400px")};
  margin-bottom: ${rem("100px")};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    max-width: ${rem("400px")};
    width: 100%;
  }
`;

export const ImagesContainer = styled.div`
  max-width: ${rem("1100px")};
  margin: ${({ theme }) => theme.spacing.s3} auto 0 auto;
  display: flex;
  flex-direction: column;
`;
