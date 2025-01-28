import React, { useState, useMemo } from "react";
import { useTheme } from "styled-components";
// Utils
import { events } from "@basestack/utils";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import {
  a11yLight,
  a11yDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Components
import { IconButton, Segment } from "@basestack/design-system";
import {
  Circle,
  Circles,
  CodeContainer,
  CodeHeader,
  Container,
  ContentContainer,
} from "./styles";
import SectionHeader from "../SectionHeader";
// Data
import data from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

export interface Props {
  id?: string;
}

const Code = ({ id = "code" }: Props) => {
  const { isDarkMode, colors, spacing } = useTheme();
  const [sliderPosition, setSliderPosition] = useState(0);

  const tab = useMemo(() => {
    return data[sliderPosition];
  }, [sliderPosition]);

  return (
    <Container id={id}>
      <ContentContainer>
        <SectionHeader
          title="Explore our SDK Options"
          text="Discover our supported SDKs tailored to meet your development needs, enabling faster releases. Explore our comprehensive documentation for more in-depth information and guidance."
        />
        <Segment
          selectedIndex={sliderPosition}
          onSelect={(item) => {
            events.landing.code(`Selected ${item} tab`);
            setSliderPosition(data.findIndex((tab) => tab.id === item));
          }}
          items={data}
          mb={spacing.s5}
        />
        <CodeContainer>
          <CodeHeader>
            <Circles>
              <Circle color={colors.red200} />
              <Circle color={colors.yellow200} />
              <Circle color={colors.green200} />
            </Circles>
            <IconButton onClick={() => {}} icon="content_copy" size="small" />
          </CodeHeader>
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language="javascript"
            style={isDarkMode ? a11yDark : a11yLight}
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
