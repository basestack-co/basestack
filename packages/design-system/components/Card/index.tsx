import { forwardRef, memo } from "react";
import { Container } from "./styles";
import { CardProps, Variant } from "./types";

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = Variant.DEFAULT,
      children,
      testId = "card",
      hasHoverAnimation = false,
      color,
      ...props
    },
    ref,
  ) => (
    <Container
      hasHoverAnimation={hasHoverAnimation}
      ref={ref}
      data-testid={testId}
      variant={variant}
      color={color as string}
      {...props}
    >
      {children}
    </Container>
  ),
);

Card.displayName = "Card";

export { type CardProps, Variant as CardVariant };

export default memo(Card);
