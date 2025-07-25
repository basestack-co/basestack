import { memo } from "react";
import type { SpaceProps } from "styled-system";
import { Hr } from "./styles";

interface HorizontalRuleProps extends SpaceProps {
  isDarker?: boolean;
}
const HorizontalRule = ({
  isDarker = false,
  ...props
}: HorizontalRuleProps) => (
  <Hr data-testid="horizontal-rule" isDarker={isDarker} {...props} />
);

export default memo(HorizontalRule);
