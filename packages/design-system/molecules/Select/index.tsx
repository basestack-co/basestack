import React from "react";
import ReactSelect, { Props } from "react-select";
import { useTheme } from "styled-components";

const Select = (props: Props) => {
  const theme = useTheme();

  return (
    <ReactSelect
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...(state.isFocused
            ? {
                outline: `2px solid ${theme.colors.black}`,
              }
            : {}),
          backgroundColor: theme.colors.gray50,
          border: "none",
        }),
      }}
      {...props}
    />
  );
};

export default Select;
