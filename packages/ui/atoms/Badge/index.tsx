import styled from "styled-components";

interface IBadgeProps {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

const Badge = styled.div<IBadgeProps>`
  background-color: ${(props) => props.backgroundColor || "#e0e0e0"};
  padding: ${(props) => props.padding || "5px"};
  border-radius: ${(props) => props.borderRadius || "50%"};
  font-size: 12px;
  color: #212121;
  min-width: 24px;
  text-align: center;
`;

export default Badge;
