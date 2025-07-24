import React, { forwardRef } from "react";
import ReactSelect, {
  type ClearIndicatorProps,
  components,
  type DropdownIndicatorProps,
  type Props,
} from "react-select";
import { useTheme } from "styled-components";
import Icon from "../Icon";

const DropdownIndicator = ({ children, ...props }: DropdownIndicatorProps) => {
  const theme = useTheme();

  return (
    <components.DropdownIndicator {...props}>
      <Icon icon="expand_more" color={theme.select.icon.color} />
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
      <Icon icon="close" color={theme.select.icon.color} />
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
      menuPlacement="auto"
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (baseStyles) => ({
          ...baseStyles,
          zIndex: theme.zIndex.reactSelect,
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...(state.isFocused
            ? {
                outline: `2px solid ${theme.select.focus.outline}`,
              }
            : {}),
          backgroundColor: theme.select.backgroundColor,
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
          backgroundColor: theme.select.menu.backgroundColor,
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          padding: "4px",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: theme.select.placeholder.color,
        }),
        option: (baseStyles, { isSelected }) => ({
          ...baseStyles,
          color: theme.select.option.color,
          backgroundColor: isSelected
            ? theme.select.option.selected.backgroundColor
            : theme.select.option.backgroundColor,
          fontWeight: 400,
          fontSize: "14px",
          borderRadius: "4px",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          ":hover": {
            ...baseStyles[":hover"],
            backgroundColor: theme.select.option.hover.backgroundColor,
            cursor: "pointer",
          },
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: theme.select.indicator.backgroundColor,
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          color: theme.select.color,
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: theme.select.color,
        }),
      }}
      {...props}
    />
  );
});

Select.displayName = "Select";

export default Select;
