// @ts-nocheck
import styled, { css } from "styled-components";
import { compose, flexbox, space } from "styled-system";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  ${compose(space, flexbox)};
  ${({ size }) => handleButtonSize(size)};
  border-radius: ${({ theme }) => theme.values.borderRadius.medium};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  text-transform: ${({ textTransform }) => textTransform || null};
`;
