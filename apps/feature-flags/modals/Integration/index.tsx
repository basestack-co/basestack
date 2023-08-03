import React, { useState, useMemo } from "react";
// Store
import { useStore } from "store";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { ButtonVariant, Modal, Text } from "@basestack/design-system";
import CopyButton from "components/CopyButton";
import CodeLanguageCard from "components/CodeLanguageCard";
// Styles
import { useTheme } from "styled-components";
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
import data from "./data";

SyntaxHighlighter.registerLanguage("typescript", ts);

const IntegrationModal = () => {
  const theme = useTheme();
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const isModalOpen = useStore((state) => state.isIntegrationModalOpen);
  const setIntegrationModalOpen = useStore(
    (state) => state.setIntegrationModalOpen,
  );

  const onClose = () => setIntegrationModalOpen({ isOpen: false });

  const tab = useMemo(() => {
    return data[selectedListIndex];
  }, [selectedListIndex]);

  return (
    <Portal selector="#portal">
      <Modal
        title="Implementing Feature Flags"
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
            {data.map(({ id, text }, index) => (
              <ListItem key={id}>
                <CodeLanguageCard
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
              {tab.text} SDK Reference
            </Text>
            <Text size="small" muted>
              Explore the{" "}
              <StyledLink href={tab.href} target="_blank">
                {tab.text} SDK Docs
              </StyledLink>{" "}
              to learn how to install and use the SDK.
            </Text>
            <CodeContainer>
              <CopyButtonContainer>
                <CopyButton text={tab.code} />
              </CopyButtonContainer>
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
      </Modal>
    </Portal>
  );
};

export default IntegrationModal;
