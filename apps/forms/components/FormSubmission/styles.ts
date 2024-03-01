import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto repeat(3, minmax(0, 1fr)) auto;
  grid-gap: ${({ theme }) => theme.spacing.s5};
`;

export const Content = styled.div`
  text-align: left;
  padding-right: ${({ theme }) => theme.spacing.s5};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    top: calc(50% - 10px);
    right: -1px;
    width: 2px;
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray600" : "gray100"]};
  }
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
