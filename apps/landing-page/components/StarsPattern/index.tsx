import { Icon } from "@basestack/design-system";
import React, { useEffect, useMemo, useState } from "react";
import { animated, useSprings } from "react-spring";
import { useTheme } from "styled-components";
import { Star, Stars } from "./styles";

const AnimatedStar = animated(Star);

const StarPattern = ({ count }: { count: number }) => {
  const { colors, isDarkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const stars = useMemo(
    () =>
      [...Array(count)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      })),
    [count],
  );

  const [springs, api] = useSprings(count, () => ({
    opacity: 0,
    config: { duration: Math.random() * 3000 + 2000 },
  }));

  useEffect(() => {
    api.start((index) => ({
      opacity: 1,
    }));
  }, [api]);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Stars>
      {springs.map((props, i) => {
        const distanceX =
          parseFloat(stars[i].left) -
          (mousePosition.x / window.innerWidth) * 100;
        const distanceY =
          parseFloat(stars[i].top) -
          (mousePosition.y / window.innerHeight) * 100;

        return (
          <AnimatedStar
            key={i}
            style={{
              top: `${parseFloat(stars[i].top) + distanceY * 0.1}%`,
              left: `${parseFloat(stars[i].left) + distanceX * 0.1}%`,
              ...props,
            }}
          >
            <Icon
              icon="star"
              size="small"
              color={isDarkMode ? colors.gray600 : colors.gray400}
            />
          </AnimatedStar>
        );
      })}
    </Stars>
  );
};

export default StarPattern;
