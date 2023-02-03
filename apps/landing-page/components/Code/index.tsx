import React, { useState } from "react";
import { useTheme } from "styled-components";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Components
import { Tabs } from "@basestack/design-system";
import { CodeContainer, Container, ContentContainer } from "./styles";
import SectionHeader from "../SectionHeader";
// Data
import { javascript, vue, jquery, react } from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

const tabs = [
  { id: "js", text: "Javascript" },
  { id: "react", text: "React" },
  { id: "vue", text: "Vue" },
  { id: "jq", text: "jquery" },
];

const Code = () => {
  const theme = useTheme();
  const [sliderPosition, setSliderPosition] = useState(1);

  const codeStringIndex: { [key: number]: string } = {
    0: javascript,
    1: react,
    2: vue,
    3: jquery,
  };

  const codeString = codeStringIndex[sliderPosition];

  return (
    <Container isDarkMode>
      <ContentContainer>
        <SectionHeader
          isDarkMode
          title="Available in Frontend Frameworks"
          text="We currently support these popular languages and frameworks"
        />
        <CodeContainer>
          <Tabs
            sliderPosition={sliderPosition}
            onSelect={(item) =>
              setSliderPosition(tabs.findIndex((tab) => tab.id === item))
            }
            items={tabs}
            backgroundColor={theme.colors.gray700}
            borderColor={theme.colors.gray600}
            textColor={theme.colors.gray300}
            activeBorderColor={theme.colors.blue300}
            hoverBgColor={theme.colors.gray600}
          />
          <SyntaxHighlighter language="javascript" style={a11yDark}>
            {codeString}
          </SyntaxHighlighter>
        </CodeContainer>
      </ContentContainer>
    </Container>
  );
};

export default Code;
