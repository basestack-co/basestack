import styled from "styled-components";
import { space } from "styled-system";
import { transparentize } from "polished";

export const Container = styled.div`
  ${space};
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const Label = styled.label`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  width: 34px;
  height: 14px;
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked ~ span {
    background-color: ${({ theme }) =>
      theme.switchComp.checked.backgroundColor};

    &::before {
      background-color: ${({ theme }) => theme.switchComp.checked.color};
    }

    &::before,
    &::after {
      -webkit-transform: translateX(16px);
      -ms-transform: translateX(16px);
      transform: translateX(16px);
    }

    &::after {
      background-color: ${({ theme }) =>
        theme.switchComp.after.checked.backgroundColor};
    }
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.switchComp.backgroundColor};
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 12px;

  &::before {
    content: "";
    position: absolute;
    height: 20px;
    width: 20px;
    left: -1px;
    top: -3px;
    background-color: ${({ theme }) => theme.switchComp.color};
    box-shadow: ${({ theme }) => theme.shadow.elevation3};
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 50%;
    z-index: 1;
  }

  &::after {
    position: absolute;
    height: 32px;
    width: 32px;
    left: -7px;
    top: -9px;
    background-color: transparent;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }

  &:hover {
    &::after {
      content: "";
      background-color: ${({ theme }) =>
        theme.switchComp.after.backgroundColor};
    }
  }
`;
