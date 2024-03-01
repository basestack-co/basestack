import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};
  padding: 0 ${({ theme }) => theme.spacing.s5};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  flex-grow: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) =>
    `${theme.spacing.s4} ${theme.spacing.s5} ${theme.spacing.s4} 0`};
`;

export const ContentDivider = styled.div`
  display: flex;
  align-items: center;
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

export const TextWrapper = styled.div`
  text-align: left;
  min-width: 0;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
