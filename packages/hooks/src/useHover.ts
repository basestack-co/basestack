import * as React from "react";
const { useState, useMemo } = React;

const useHover = () => {
  const [hovered, setHovered] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    [],
  );

  return [hovered, eventHandlers];
};

export default useHover;
