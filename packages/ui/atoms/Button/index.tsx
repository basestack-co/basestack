import React from "react";
import styled from "styled-components";
import { transparentize, darken } from "polished";

const typeModifier = (
  type: string,
  props: { lightFocus?: boolean; theme: any }
) => {
  switch (type) {
    case "primary":
      return `
        background: ${props.theme.colors.highlight};
        border: 1px solid  ${props.theme.colors.highlight};
        color: #001e1d;
        :focus {
          box-shadow: 0 0 0 0.2rem ${transparentize(
            0.3,
            props.theme.colors.highlight
          )};
        }
        :hover {
          background: ${darken(0.08, props.theme.colors.highlight)};
          border: 1px solid  ${darken(0.08, props.theme.colors.highlight)};
        }
        :active {
          background: ${transparentize(0.3, props.theme.colors.highlight)};
        }
    `;
    case "danger":
      return `
        background: ${props.theme.colors.white};
        border: 1px solid ${props.theme.colors.tertiary};
        color: ${props.theme.colors.tertiary};
        :focus {
          box-shadow: 0 0 0 0.2rem ${transparentize(
            0.3,
            props.theme.colors.tertiary
          )};
        }
        :hover {
          background: ${darken(0.08, props.theme.colors.tertiary)};
          border: 1px solid  ${darken(0.08, props.theme.colors.tertiary)};
        }
        :active {
          background: ${transparentize(0.3, props.theme.colors.tertiary)};
        }
    `;
    case "success":
      return `
        background: ${props.theme.colors.primary};
        border: 1px solid ${props.theme.colors.primary};
        color: ${props.theme.colors.white};
        :focus {
          box-shadow: 0 0 0 0.2rem ${transparentize(
            0.3,
            props.theme.colors.primary
          )};
        }
        :hover {
          background: ${darken(0.08, props.theme.colors.primary)};
          border: 1px solid  ${darken(0.08, props.theme.colors.primary)};
        }
        :active {
          background: ${transparentize(0.3, props.theme.colors.primary)};
        }
    `;
    case "icon":
      return `
        background: transparent;
        border: none;
        padding: 0;
        height: 24px;
        width: 24px;
        :focus {
          box-shadow: ${
            props.lightFocus
              ? "0 0 0 0.2rem rgba(255, 255, 255, 0.3)"
              : "0 0 0 0.2rem rgba(0, 0, 0, 0.3)"
          };
        }
        :hover {
          background: transparent;
        }
        :active {
          i {
            opacity: 0.7;
          }
        }
    `;
    default:
      return `
        background: #FAFAFA;
        border: 1px solid #212121;
        color: #212121;
        :focus {
          box-shadow: 0 0 0 0.2rem rgba(33, 33, 33, 0.3);
        }
        :hover {
          background: #212121;
          color: #fff;
        }
        :active {
          background: rgba(33, 33, 33, 0.7);
        }
    `;
  }
};

interface Props {
  children: React.ReactNode;
  height?: string;
  width?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  cursor?: string;
  outline?: string;
  variant?: "primary" | "danger" | "icon" | "default" | "success";
  margin?: string;
  lightFocus?: boolean;
}

const Button = styled.button<Props>`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => props.width || "auto"};
  border-radius: ${(props) => props.borderRadius || "4px"};
  padding: ${(props) => props.padding || "10px 20px"};
  font-size: ${(props) => props.fontSize || "16px"};
  cursor: ${(props) => props.cursor || "pointer"};
  outline: ${(props) => props.outline || "none"};

  ${(props) => typeModifier(props.variant || "default", props)};

  margin: ${(props) => props.margin};

  :disabled,
  button[disabled] {
    border: 1px solid #999999;
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  children: "Texto",
  variant: "primary",
};

export default Button;
