import { useTheme } from "styled-components";
import Text from "../Text";
import { CircleProgress, CircleWrapper, Svg, TextContainer } from "./styles";

export interface CircularProgressProps {
  usage: number;
  total: number;
  size: number;
  strokeWidth?: number;
  displayPercentage?: boolean;
  variant: "default" | "success" | "warning" | "danger";
  description?: string;
}

const CircularProgress = ({
  size = 100,
  usage = 0,
  total = 100,
  displayPercentage = false,
  strokeWidth = 5,
  variant = "default",
  description,
}: CircularProgressProps) => {
  const theme = useTheme();
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const percentage =
    total > 0 ? Math.min(Math.round((usage / total) * 100), 100) : 0;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: theme.circularProgress.progress.default,
    success: theme.circularProgress.progress.success,
    warning: theme.circularProgress.progress.warning,
    danger: theme.circularProgress.progress.danger,
  };

  const color = colors[variant];

  return (
    <CircleWrapper size={size}>
      <Svg>
        <circle
          fill="none"
          stroke={theme.circularProgress.stroke}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <CircleProgress
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </Svg>
      {!!description && (
        <TextContainer>
          <Text muted>{description}</Text>
        </TextContainer>
      )}
      {displayPercentage && (
        <TextContainer>
          <Text>{percentage}%</Text>
        </TextContainer>
      )}
    </CircleWrapper>
  );
};

export default CircularProgress;
