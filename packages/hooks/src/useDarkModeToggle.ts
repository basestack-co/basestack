import { useState } from "react";

type Direction = "top-right" | "bottom-right";

const useDarkModeToggle = (): {
  isDarkMode: boolean;
  toggleDarkMode: (isDarkMode: boolean, direction?: Direction) => Promise<void>;
} => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async (
    isDarkMode: boolean,
    direction: Direction = "top-right",
  ): Promise<void> => {
    /**
     * Return early if View Transition API is not supported
     * or user prefers reduced motion
     */
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsDarkMode(isDarkMode);
      return;
    }

    // Start the view transition and toggle dark mode state
    await document.startViewTransition(() => {
      setIsDarkMode(isDarkMode);
    }).ready;

    // Calculate initial clip-path values based on direction
    let initialTop, initialRight, initialBottom, initialLeft;

    if (direction === "top-right") {
      initialTop = 0; // Start from the top
      initialRight = 0; // Start from the right
      initialBottom = window.innerHeight; // Full height initially
      initialLeft = window.innerWidth; // Full width initially
    } else if (direction === "bottom-right") {
      initialTop = window.innerHeight; // Start from the bottom
      initialRight = 0; // Start from the right
      initialBottom = 0; // No height initially
      initialLeft = window.innerWidth; // Full width initially
    }

    // Animate the clip-path expanding from the specified corner
    document.documentElement.animate(
      {
        clipPath: [
          `inset(${initialTop}px ${initialRight}px ${initialBottom}px ${initialLeft}px)`,
          `inset(0px 0px 0px 0px)`,
        ],
      },
      {
        duration: 400,
        easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkModeToggle;
