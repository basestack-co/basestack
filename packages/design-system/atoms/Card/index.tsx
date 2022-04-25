import React, { memo, ReactNode } from "react";
import { SpaceProps } from "styled-system";
import { Container } from "./styles";

interface CardProps extends SpaceProps {
  /**
   * Content
   */
  children: ReactNode;
}

const Card = ({ children, ...props }: CardProps) => (
  <Container data-testid="card" {...props}>
    {children}
  </Container>
);

export default memo(Card);
