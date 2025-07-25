import { Avatar, slideBottom, Text } from "@basestack/design-system";
import { useEffect, useMemo, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import { Box, HeaderCell, HeaderGrid } from "../styles";
import type { Data } from "../types";

const AnimatedBGrid = animated(HeaderGrid);

interface GridProps {
  data: Data;
  isVisible: boolean;
  onDestroyed: () => void;
}

const Grid = ({ data, isVisible, onDestroyed }: GridProps) => {
  const theme = useTheme();
  const [initialRender, setInitialRender] = useState(true);

  const isMediumDevice = useMedia(theme.device.max.md, false);
  const isLargeDevice = useMedia(theme.device.max.lg, false);

  const numberOfCells = useMemo(() => {
    if (isMediumDevice) {
      return 1;
    }
    return isLargeDevice ? 2 : 3;
  }, [isMediumDevice, isLargeDevice]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  const transitionGrid = useTransition(isVisible, {
    config: { ...config.default, duration: initialRender ? 0 : 200 },
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
        <AnimatedBGrid columns={numberOfCells} style={styles}>
          {data.slice(0, numberOfCells).map((item, index, { length }) => (
            <HeaderCell key={index} hasBorder={index + 1 !== length}>
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
