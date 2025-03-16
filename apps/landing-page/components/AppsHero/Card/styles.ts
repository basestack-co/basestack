import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  height: 100%;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  .icon-box::before {
    transition: background-color 0.2s ease-in-out;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;
