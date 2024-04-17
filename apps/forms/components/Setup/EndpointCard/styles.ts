import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${({ theme }) => theme.spacing.s5};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  max-width: 400px;
  width: 100%;
`;
