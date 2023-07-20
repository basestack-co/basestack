import styled from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";
import { LabelVariant, LabelSize } from "./types";

const getSizeStyles = (size: LabelSize) => {
  const styles = {
    normal: {
      padding: `${rem("4px")} ${rem("6px")}`,
      fontSize: `${rem("14px")}`,
      lineHeight: `${rem("16px")}`,
      fontWeight: 400,
    },
    medium: {
      padding: `${rem("6px")} ${rem("8px")}`,
      fontSize: `${rem("16px")}`,
      lineHeight: `${rem("18px")}`,
      fontWeight: 500,
    },
  };

  return styles[size];
};

export const StyledLabel = styled.div<{
  variant: LabelVariant;
  size: LabelSize;
  isTranslucent: boolean;
}>`
  ${space};
  display: flex;
  border-radius: 4px;
  ${({ size }) => getSizeStyles(size)};
  ${({ theme, variant, isTranslucent }) =>
    isTranslucent
      ? theme.label.translucent[variant]
      : theme.label.solid[variant]};
`;
