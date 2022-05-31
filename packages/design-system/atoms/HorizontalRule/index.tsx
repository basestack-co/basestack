import React, { memo } from "react";
import { SpaceProps } from "styled-system";
import { Hr } from "./styles";

const HorizontalRule = ({ ...props }: SpaceProps) => (
  <Hr data-testid="horizontal-rule" {...props} />
);

export default memo(HorizontalRule);
