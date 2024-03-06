import React from "react";
import { animated, config, useTransition } from "react-spring";
import { useTheme } from "styled-components";
import { Avatar, slideBottom, Text } from "@basestack/design-system";
import { Box, HeaderCell, HeaderGrid } from "../styles";
import { Data } from "../types";

const AnimatedBGrid = animated(HeaderGrid);

interface GridProps {
  data: Data;
  isVisible: boolean;
  onDestroyed: () => void;
}

const Grid = ({ data, isVisible, onDestroyed }: GridProps) => {
  const theme = useTheme();

  const transitionGrid = useTransition(isVisible, {
    config: { ...config.default, duration: 200 },
    ...slideBottom,
    onDestroyed: (item) => {
      if (item) {
        onDestroyed();
      }
    },
  });

  return transitionGrid(
    (styles, item) =>
      item && (
        <AnimatedBGrid style={styles}>
          {data.map((item, index) => (
            <HeaderCell key={index}>
              {item.description.includes("@") && (
                <Avatar
                  userName={item.description.substring(0, 2)}
                  size="xSmall"
                  alt=""
                  mr={theme.spacing.s2}
                />
              )}
              <Box minWidth={0}>
                <Text size="xSmall" muted>
                  {item.title}
                </Text>
                <Text fontWeight={400} lineTruncate>
                  {item.description}
                </Text>
              </Box>
            </HeaderCell>
          ))}
        </AnimatedBGrid>
      ),
  );
};

export default Grid;
