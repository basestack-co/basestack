import React, { useState } from "react";
import { useStore } from "store";
import { useTheme } from "styled-components";
import Portal from "@basestack/design-system/global/Portal";
import { ButtonVariant, Modal, Text } from "@basestack/design-system";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
// Components
import LanguageCard from "./LanguageCard";
import {
  CardsList,
  CodeContainer,
  Container,
  ContentContainer,
  ListItem,
  StyledLink,
  CopyButtonContainer,
} from "./styles";
// Data
import { buttons, javascript, react, rest } from "./data";
import CopyButton from "./CopyButton";

SyntaxHighlighter.registerLanguage("typescript", ts);

const SDKModal = () => {
  const theme = useTheme();
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const isModalOpen = useStore((state) => state.isSDKModalOpen);
  const setSDKModalOpen = useStore((state) => state.setSDKModalOpen);
  const onClose = () => setSDKModalOpen({ isOpen: false });

  const codeStringIndex: { [key: number]: string } = {
    0: javascript,
    1: react,
    2: rest,
  };

  const codeString = codeStringIndex[selectedListIndex];

  return (
    <Portal selector="#portal">
      <Modal
        title="Feature Implementation"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          {
            children: "Close",
            onClick: onClose,
            variant: ButtonVariant.Neutral,
          },
        ]}
      >
        <Container>
          <CardsList>
            {buttons.map(({ id, text }, index) => (
              <ListItem key={id}>
                <LanguageCard
                  text={text}
                  icon={id}
                  onSelect={() => setSelectedListIndex(index)}
                  isSelected={selectedListIndex === index}
                />
              </ListItem>
            ))}
          </CardsList>
          <ContentContainer>
            <Text size="large" mb={theme.spacing.s1}>
              {buttons[selectedListIndex].text} Usage Instructions
            </Text>
            <Text size="small" muted>
              Read the{" "}
              <StyledLink href="">
                {buttons[selectedListIndex].text} SDK docs
              </StyledLink>{" "}
              or view a{" "}
              <StyledLink href="">complete implementation example</StyledLink>.
            </Text>
            <CodeContainer>
              <CopyButtonContainer>
                <CopyButton text={codeString} />
              </CopyButtonContainer>
              <SyntaxHighlighter
                language="javascript"
                style={a11yDark}
                wrapLongLines
              >
                {codeString}
              </SyntaxHighlighter>
            </CodeContainer>
          </ContentContainer>
        </Container>
      </Modal>
    </Portal>
  );
};

export default SDKModal;
