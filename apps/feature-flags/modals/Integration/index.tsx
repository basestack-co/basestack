import { Modal, Text } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { CodeLanguageCard } from "@basestack/ui";
import CopyButton from "components/CopyButton";
// Locales
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
// Code
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import ts from "react-syntax-highlighter/dist/cjs/languages/hljs/typescript";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// Store
import { useStore } from "store";
// Styles
import { useTheme } from "styled-components";
import { useShallow } from "zustand/react/shallow";
// Data
import data from "./data";
import {
  CardsList,
  CodeContainer,
  Container,
  ContentContainer,
  CopyButtonContainer,
  ListItem,
  StyledLink,
} from "./styles";

SyntaxHighlighter.registerLanguage("typescript", ts);

const IntegrationModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [isModalOpen, setIntegrationModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isIntegrationModalOpen,
        state.setIntegrationModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const onClose = () => setIntegrationModalOpen({ isOpen: false });

  const tab = useMemo(() => {
    return data[selectedListIndex];
  }, [selectedListIndex]);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("integration.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        closeOnClickOutside={closeModalsOnClickOutside}
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
              {tab.text} {t("integration.sdk.reference")}
            </Text>
            <Text size="small" muted>
              {t("integration.sdk.explore")}{" "}
              <StyledLink href={tab.href} target="_blank">
                {tab.text} {t("integration.sdk.docs")}
              </StyledLink>{" "}
              {t("integration.sdk.more")}
            </Text>
            <CodeContainer>
              <CopyButtonContainer>
                <CopyButton text={tab.code} />
              </CopyButtonContainer>
              {/* @ts-ignore */}
              <SyntaxHighlighter
                language="typescript"
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
