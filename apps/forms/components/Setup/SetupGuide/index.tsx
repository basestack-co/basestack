import React, { useState } from "react";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
// Theme
import { useTheme } from "styled-components";
// Components
import { CodeLanguageCard } from "@basestack/ui";
import { Text, Card } from "@basestack/design-system";
import Step from "./Step";
import { CodeContainer, List, ListItem } from "./styles";
import { data, javascriptCode } from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

const SetupGuide = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const theme = useTheme();

  return (
    <Card p={theme.spacing.s5}>
      <Text mb={theme.spacing.s1} size="large">
        Setup guide
      </Text>
      <Text data-testid="setting-title" size="small" muted>
        Follow our step by step examples to build and collect form submissions
        from your front-end code
      </Text>

      <Text mt={theme.spacing.s5} mb={theme.spacing.s3} size="large">
        Select your platform
      </Text>
      <List>
        {data.map(({ id, text }, index) => (
          <ListItem key={id}>
            <CodeLanguageCard
              text={text}
              icon={id}
              onSelect={() => setSelectedLanguage(index)}
              isSelected={selectedLanguage === index}
            />
          </ListItem>
        ))}
      </List>

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
      >
        <CodeContainer>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="typescript"
            style={a11yDark}
            wrapLongLines
          >
            {javascriptCode}
          </SyntaxHighlighter>
        </CodeContainer>
      </Step>
    </Card>
  );
};

export default SetupGuide;
