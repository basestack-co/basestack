import React, { useState } from "react";
import { useTheme } from "styled-components";
// Components
import { Text, Card, Icon, Checkbox, Avatar } from "@basestack/design-system";
// Styles
import {
  Button,
  Container,
  ContentDivider,
  Grid,
  RightContent,
  TextWrapper,
} from "./styles";

interface FormSubmissionProps {
  date: string;
  data: Array<{
    title: string;
    description: string;
  }>;
}

const FormSubmission = ({ data, date }: FormSubmissionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Card pl={theme.spacing.s5}>
      <Container>
        <ContentDivider>
          <Checkbox
            checked={checked}
            onChange={() => setChecked((prevState) => !prevState)}
          />
        </ContentDivider>
        <Button onClick={() => setIsOpen((prevState) => !prevState)}>
          <Grid>
            {data.map((item, index) => (
              <ContentDivider key={index}>
                {item.description.includes("@") && (
                  <Avatar
                    userName={item.description.substring(0, 2)}
                    size="xSmall"
                    alt=""
                    mr={theme.spacing.s2}
                  />
                )}
                <TextWrapper>
                  <Text size="xSmall" muted>
                    {item.title}
                  </Text>
                  <Text fontWeight={400} lineTruncate>
                    {item.description}
                  </Text>
                </TextWrapper>
              </ContentDivider>
            ))}
          </Grid>
          <RightContent>
            <Text mr={theme.spacing.s5} fontWeight={400} muted>
              {date}
            </Text>
            <Icon icon="unfold_more" muted />
          </RightContent>
        </Button>
      </Container>
    </Card>
  );
};

export default FormSubmission;
