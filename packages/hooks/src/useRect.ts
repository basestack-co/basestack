import { RefCallback, useCallback, useState } from "react";

const useRect = (): [RefCallback<HTMLElement | null>, DOMRect | undefined] => {
  const [dimensions, setDimensions] = useState<DOMRect | undefined>();

  const ref: RefCallback<HTMLElement | null> = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        setDimensions(node.getBoundingClientRect());

        const resizeObserver = new ResizeObserver((entries) => {
          if (entries.length) {
            setDimensions(entries[0].target.getBoundingClientRect());
          }
        });

        resizeObserver.observe(node);

        return () => {
          resizeObserver.unobserve(node);
          resizeObserver.disconnect();
        };
      }
    },
    [],
  );

  return [ref, dimensions];
};

export default useRect;
