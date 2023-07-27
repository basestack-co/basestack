import React from "react";
import { Skeleton } from "@basestack/design-system";
import { SelectedView } from "types";
import { FlagsCardGrid, FlagsTableGrid } from "./styles";

interface LoadingProps {
  selectedView: SelectedView;
}

const Loading = ({ selectedView }: LoadingProps) => {
  const cardItems = [
    { h: 24, w: "80%", mb: 14 },
    { h: 18, w: "50%", mb: 12 },
    { h: 24, w: 80, mb: 18 },
    { h: 20, w: "20%", mb: 0 },
  ];
  const rowItems = [
    { h: 24, w: 40, mr: 20 },
    { h: 24, w: "20%", mr: 0 },
  ];
  const items = selectedView === "cards" ? cardItems : rowItems;

  const Container = selectedView === "cards" ? FlagsCardGrid : FlagsTableGrid;

  return (
    <Container>
      <Skeleton
        numberOfItems={3}
        items={items}
        padding={selectedView === "cards" ? 20 : 14}
        displayInline={selectedView !== "cards"}
      />
    </Container>
  );
};

export default Loading;
