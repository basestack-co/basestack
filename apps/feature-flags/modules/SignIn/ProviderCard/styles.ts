import styled from "styled-components";
import { rem } from "polished";
export const Card = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${rem("10px")};
  padding: ${({ theme }) => theme.spacing.s5} ${({ theme }) => theme.spacing.s5}
    ${rem("25px")} ${({ theme }) => theme.spacing.s5};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  border: 1px solid ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition:
    box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  .arrow-icon {
    visibility: hidden;
    transform: translateX(-15px);
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue50};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.elevation3};

    .arrow-icon {
      visibility: visible;
      transform: translateX(0);
    }
  }
`;

export const ProviderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${rem("58px")};
  width: ${rem("58px")};
  border-radius: ${rem("8px")};
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const IconContainer = styled.div`
  display: flex;
  margin-left: auto;
`;
