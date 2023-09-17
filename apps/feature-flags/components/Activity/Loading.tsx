import React from "react";
import { useTheme } from "styled-components";
import { Card, Skeleton } from "@basestack/design-system";

const Loading = () => {
  const theme = useTheme();

  return (
    <Card padding={theme.spacing.s5}>
      <Skeleton
        numberOfItems={2}
        gapBetweenItems={24}
        displayInline
        items={[
          { h: 40, w: 40, mr: 20, isRound: true },
          { h: 28, w: 28, mr: 12, isRound: true },
          { h: 47, w: "100%" },
        ]}
        hasShadow={false}
        padding={0}
      />
    </Card>
  );
};

export default Loading;
