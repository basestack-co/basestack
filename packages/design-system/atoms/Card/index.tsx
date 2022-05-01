import React, { memo, ReactNode } from "react";
import { SpaceProps } from "styled-system";
import { Container } from "./styles";

interface CardProps extends SpaceProps {
  /**
   * Content
   */
  children: ReactNode;
  /**
   * TestID
   */
  testId?: string;
}

const Card = ({ children, testId = "card", ...props }: CardProps) => (
  <Container data-testid={testId} {...props}>
    {children}
  </Container>
);

export default memo(Card);
