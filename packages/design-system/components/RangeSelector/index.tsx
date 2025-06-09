import React, { useState, ChangeEvent, useEffect } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import Box from "../Box";
import Flex from "../Flex";
import Text from "../Text";
import { StyledRange } from "./styles";

export interface RangeSelectorProps {
  id?: string;
  name?: string;
  initialValue?: number;
  decimalPlaces?: number;
  min?: string;
  max?: string;
  step?: number;
  displayValue?: string;
  onChange?: (value: number) => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  id,
  name,
  initialValue = 0,
  decimalPlaces = 0,
  min = "0",
  max = "100",
  step = "1",
  displayValue = true,
  onChange,
}) => {
  const { isDarkMode, spacing, colors } = useTheme();
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  useEffect(() => {
    if (onChange) onChange(value);
  }, []);

  const percentage = ((value - +min) / (+max - +min)) * 100;

  return (
    <Flex flexDirection="column">
      {displayValue && (
        <Text
          size="xLarge"
          fontWeight={500}
          color={isDarkMode ? colors.blue300 : colors.primary}
          mb={spacing.s2}
        >
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(value)}
        </Text>
      )}
      <Box display="flex" alignItems="center" height={rem("24px")}>
        <StyledRange
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          percentage={percentage}
          fillColor={colors.primary}
          trackColor={isDarkMode ? colors.gray600 : colors.gray200}
        />
      </Box>
    </Flex>
  );
};

export default RangeSelector;
