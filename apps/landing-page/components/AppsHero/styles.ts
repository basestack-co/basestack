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

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing.s5};
  gap: ${({ theme }) => theme.spacing.s5};
  max-width: 600px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.s5} auto 0 auto;
`;

export const Cards = styled.div`
  display: flex;
  gap: 20px;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-top-left-radius: ${rem("8px")};
  border-top-right-radius: ${rem("8px")};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;
