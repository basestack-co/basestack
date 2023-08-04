import React, { useState, useMemo } from "react";
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
import data from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

export interface Props {
  id?: string;
}

const Code = ({ id = "code" }: Props) => {
  const theme = useTheme();
  const [sliderPosition, setSliderPosition] = useState(1);

  const tab = useMemo(() => {
    return data[sliderPosition];
  }, [sliderPosition]);

  return (
    <Container id={id} isDarkMode>
      <ContentContainer>
        <SectionHeader
          isDarkMode
          title="Explore our SDK Options"
          text="Discover our supported SDKs tailored to meet your development needs, enabling faster releases. Explore our comprehensive documentation for more in-depth information and guidance."
        />
        <CodeContainer>
          <Tabs
            sliderPosition={sliderPosition}
            onSelect={(item) =>
              setSliderPosition(data.findIndex((tab) => tab.id === item))
            }
            items={data}
            backgroundColor={theme.colors.gray700}
            borderColor={theme.colors.gray600}
            textColor={theme.colors.gray300}
            activeBorderColor={theme.colors.blue300}
            hoverBgColor={theme.colors.gray600}
            textSize="medium"
          />
          <SyntaxHighlighter
            language="javascript"
            style={a11yDark}
            wrapLongLines
          >
            {tab.code}
          </SyntaxHighlighter>
        </CodeContainer>
      </ContentContainer>
    </Container>
  );
};

export default Code;
