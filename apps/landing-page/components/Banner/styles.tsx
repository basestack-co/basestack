import styled from "styled-components";
import { rem } from "polished";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${rem("100px")} ${({ theme }) => theme.spacing.s5};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${rem("1400px")};
  width: 100%;
  margin: 0 auto;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: ${rem("300px")};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s5};
  width: 100%;
  justify-content: center;

  @media screen and ${({ theme }) => theme.device.max.sm} {
    flex-direction: column;
  }
`;
