import React from "react";
import { useTheme } from "styled-components";
import { Text, Icon } from "@basestack/design-system";
import { Container, Title, Row } from "./styles";

interface MobileCardProps {
  title: string;
  data: Array<{
    icon: string;
    text: string;
  }>;
}

const MobileCard = ({ title, data }: MobileCardProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Title muted fontWeight={500}>
        {title}
      </Title>
      {data.map((item, index) => (
        <Row key={index}>
          <Icon icon={item.icon} mr={theme.spacing.s3} />
          <Text>{item.text}</Text>
        </Row>
      ))}
    </Container>
  );
};
export default MobileCard;
