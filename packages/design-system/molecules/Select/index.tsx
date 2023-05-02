import React, { forwardRef } from "react";
import ReactSelect, { Props } from "react-select";
import { useTheme } from "styled-components";

const Select = forwardRef<any, Props>((props, ref) => {
  const theme = useTheme();

  return (
    <ReactSelect
      ref={ref}
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
});

Select.displayName = "Select";

export default Select;
