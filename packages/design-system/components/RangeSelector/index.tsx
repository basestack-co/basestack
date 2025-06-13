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
  min?: string;
  max?: string;
  step?: number;
  displayValue?: string;
  onChange?: (id: string, value: number) => void;
  inputSize?: number;
  label?: string;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  id,
  name,
  initialValue = 0,
  min = "0",
  max = "100",
  step = "1",
  displayValue = true,
  onChange,
  inputSize = 24,
  label,
}) => {
  const { isDarkMode, spacing, colors } = useTheme();
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(id!, newValue);
  };

  const percentage = ((value - +min) / (+max - +min)) * 100;

  return (
    <Flex flexDirection="column">
      {displayValue && (
        <Box mb={spacing.s2}>
          <Flex
            gap={spacing.s2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              size="xLarge"
              fontWeight={500}
              color={isDarkMode ? colors.blue300 : colors.primary}
            >
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
                minimumFractionDigits: 0,
              }).format(value)}
            </Text>
            {label && <Text muted>{label}</Text>}
          </Flex>
        </Box>
      )}
      <Box display="flex" alignItems="center" height={rem(`${inputSize}px`)}>
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
          inputSize={inputSize}
        />
      </Box>
    </Flex>
  );
};

export default RangeSelector;
