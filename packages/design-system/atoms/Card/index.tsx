import { memo, ReactNode, forwardRef } from "react";
import { SpaceProps } from "styled-system";
import { Container } from "./styles";

export interface CardProps extends SpaceProps {
  /**
   * Content
   */
  children: ReactNode;
  /**
   * TestID
   */
  testId?: string;
  /**
   * Optional hover animation
   */
  hasHoverAnimation?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, testId = "card", hasHoverAnimation = false, ...props }, ref) => (
    <Container
      hasHoverAnimation={hasHoverAnimation}
      ref={ref}
      data-testid={testId}
      {...props}
    >
      {children}
    </Container>
  ),
);

Card.displayName = "Card";

export default memo(Card);
