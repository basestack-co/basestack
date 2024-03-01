import React, { useState } from "react";
import { useTheme } from "styled-components";
// Components
import { Text, Card, Icon, Checkbox } from "@basestack/design-system";
// Styles
import { Button, Container, Content, RightContent } from "./styles";

interface FormSubmissionProps {
  date: string;
  data: Array<{
    title: string;
    description: string;
  }>;
}

const FormSubmission = ({ data, date }: FormSubmissionProps) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  return (
    <Button>
      <Card p={`${theme.spacing.s4} ${theme.spacing.s5}`}>
        <Container>
          <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
          {data.map((item, index) => (
            <Content key={index}>
              <Text size="xSmall" muted>
                {item.title}
              </Text>
              <Text fontWeight={400} lineTruncate>
                {item.description}
              </Text>
            </Content>
          ))}
          <RightContent>
            <Text mr={theme.spacing.s5} fontWeight={400} muted>
              {date}
            </Text>
            <Icon icon="unfold_more" muted ml="auto" />
          </RightContent>
        </Container>
      </Card>
    </Button>
  );
};

export default FormSubmission;
