import { memo } from "react";
import { SpaceProps } from "styled-system";
import Text from "../Text";
import { Container } from "./styles";
import { useTheme } from "styled-components";

export interface PillProps extends SpaceProps {
  /**
   * Changes styles to selected Pill
   */
  isSelected: boolean;
  /**
   * onClick callback
   */
  onClick: () => void;
  /**
   * Pill text
   */
  text: string;
}

const Pill = ({ isSelected = true, onClick, text, ...props }: PillProps) => {
  const theme = useTheme();

  return (
    <Container
      onClick={onClick}
      data-testid="pill-container"
      isSelected={isSelected}
      {...props}
    >
      <Text
        data-testid="pill-text"
        color={isSelected ? theme.colors.primary : theme.colors.black}
        size="small"
      >
        {text}
      </Text>
    </Container>
  );
};

export default memo(Pill);
