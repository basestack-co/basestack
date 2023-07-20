import React, { forwardRef } from "react";
import ReactSelect, {
  Props,
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from "react-select";
import { useTheme } from "styled-components";
import Icon from "../Icon";

const DropdownIndicator = ({ children, ...props }: DropdownIndicatorProps) => {
  const theme = useTheme();

  return (
    <components.DropdownIndicator {...props}>
      <Icon icon="expand_more" color={theme.colors.gray500} />
      {children}
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  const theme = useTheme();
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;

  return (
    <div {...restInnerProps} ref={ref} style={{ padding: "8px" }}>
      <Icon icon="close" color={theme.colors.gray500} />
    </div>
  );
};

const Select = forwardRef<any, Props>((props, ref) => {
  const theme = useTheme();

  return (
    <ReactSelect
      ref={ref}
      components={{
        ClearIndicator,
        DropdownIndicator,
      }}
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
          fontWeight: 400,
          fontSize: "14px",
          minHeight: "44px",
          fontFamily: theme.typography.roboto,
          padding: "0 6px",
          borderRadius: "4px",
          ":hover": {
            ...baseStyles[":hover"],
            cursor: "pointer",
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          boxShadow: theme.shadow.elevation3,
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          padding: "4px",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: theme.colors.gray500,
        }),
        option: (baseStyles, { isSelected }) => ({
          ...baseStyles,
          color: theme.colors.black,
          backgroundColor: isSelected
            ? theme.colors.gray100
            : theme.colors.white,
          fontWeight: 400,
          fontSize: "14px",
          borderRadius: "4px",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          ":hover": {
            ...baseStyles[":hover"],
            backgroundColor: theme.colors.gray100,
            cursor: "pointer",
          },
        }),
      }}
      {...props}
    />
  );
});

Select.displayName = "Select";

export default Select;
