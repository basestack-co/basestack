import React, { Fragment } from "react";
import { useTheme } from "styled-components";
import { Text, Card, Icon } from "@basestack/design-system";
import { StepContainer, TextHighlight } from "./styles";
import { Box } from "../styles";

interface StepProps {
  icon: string;
  title: string;
  description: Array<{ text: string; highlight?: boolean }>;
}

const Step = ({ icon = "counter_1", title, description }: StepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <Icon icon={icon} muted mt="1px" />
      <Box ml={theme.spacing.s4}>
        <Text mb={theme.spacing.s1} size="large">
          {title}
        </Text>
        <Text data-testid="setting-title" size="small" muted lineHeight="26px">
          {description.map((item, index) =>
            item.highlight ? (
              <Fragment key={index}>
                <TextHighlight>{item.text}</TextHighlight>&nbsp;
              </Fragment>
            ) : (
              <Fragment key={index}>{item.text}&nbsp;</Fragment>
            ),
          )}
        </Text>
      </Box>
    </StepContainer>
  );
};

const SetupGuide = () => {
  const theme = useTheme();

  return (
    <Card padding={theme.spacing.s5}>
      <Text mb={theme.spacing.s1} size="large">
        Setup guide
      </Text>
      <Text data-testid="setting-title" size="small" muted>
        Follow our step by step examples to build and collect form submissions
        from your front-end code
      </Text>

      <Step
        icon="counter_1"
        title="Change your form action attribute to your endpoint"
        description={[
          { text: "Set your form action to" },
          { text: "https://basestack/s/23dre5", highlight: true },
          { text: "and method to" },
          { text: "Post", highlight: true },
        ]}
      />

      <Step
        icon="counter_2"
        title="Give a name attribute to each form field"
        description={[
          {
            text: "Inputs, textareas, checkboxes, radios all form elements need to have a form attribute like",
          },
          { text: `name="example"`, highlight: true },
        ]}
      />

      <Step
        icon="counter_3"
        title="Your form is ready"
        description={[
          { text: "Try the code below to send some test submission." },
        ]}
      />
    </Card>
  );
};

export default SetupGuide;
