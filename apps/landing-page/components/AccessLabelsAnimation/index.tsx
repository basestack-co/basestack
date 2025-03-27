import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Label, IconButton } from "@basestack/design-system";
import { useTransition, animated } from "@react-spring/web";
import {
  ButtonContainer,
  Container,
  ContentContainer,
  LabelContainer,
  Labels,
} from "./styles";

const initialLabels = [
  { id: 1, text: "https://basestack.co", type: "url" },
  { id: 2, text: "https://flags.basestack.co", type: "url" },
  { id: 3, text: "https://docs.basestack.co", type: "url" },
  { id: 4, text: "192.168.1.1", type: "ip" },
  { id: 5, text: "192.168.1.2", type: "ip" },
];

const Button = ({ onClick }: { onClick: () => void }) => (
  <ButtonContainer>
    <IconButton
      onClick={onClick}
      icon="close"
      variant="secondary"
      size="small"
    />
  </ButtonContainer>
);

const AnimatedLabel = animated(LabelContainer);

const AccessLabelsAnimation = () => {
  const { isDarkMode } = useTheme();
  const variant = isDarkMode ? "light" : "default";

  const [labels, setLabels] = useState(initialLabels);
  const [randomIpLabel, setRandomIpLabel] = useState<{
    id: number;
    text: string;
  } | null>(null);

  const generateRandomIP = () => {
    const base = "192.168.1.";
    return `${base}${Math.floor(Math.random() * 10) + 1}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newLabel = {
        id: 6,
        text: generateRandomIP(),
        type: "ip" as const,
      };

      setRandomIpLabel(newLabel);

      setTimeout(() => {
        setRandomIpLabel(null);
      }, 4000); // Remove after 4 seconds
    }, 5000); // Every 5 seconds, a new random IP label

    return () => clearInterval(interval);
  }, []);

  const removeLabel = (id: number) => {
    setLabels((prev) => prev.filter((label) => label.id !== id));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (labels.length === 0) {
        setLabels(initialLabels);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [labels.length]);

  const transitions = useTransition(labels, {
    keys: (label) => label.id,
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 250, friction: 30 },
  });

  const randomIpTransition = useTransition(randomIpLabel, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 250, friction: 30 },
  });

  return (
    <Container>
      <ContentContainer>
        <Labels>
          {transitions((style, label) =>
            label.type === "url" ? (
              <AnimatedLabel style={style} key={label.id}>
                <Label text={label.text} variant={variant}>
                  <Button onClick={() => removeLabel(label.id)} />
                </Label>
              </AnimatedLabel>
            ) : null,
          )}
        </Labels>

        <Labels>
          {randomIpTransition((style, label) =>
            label ? (
              <AnimatedLabel style={style} key={label.id}>
                <Label text={label.text} variant={variant}>
                  <ButtonContainer>
                    <IconButton
                      onClick={() => null}
                      icon="close"
                      variant="secondary"
                      size="small"
                      isDisabled
                    />
                  </ButtonContainer>
                </Label>
              </AnimatedLabel>
            ) : null,
          )}

          {transitions((style, label) =>
            label.type === "ip" ? (
              <AnimatedLabel style={style} key={label.id}>
                <Label text={label.text} variant={variant}>
                  <Button onClick={() => removeLabel(label.id)} />
                </Label>
              </AnimatedLabel>
            ) : null,
          )}
        </Labels>
      </ContentContainer>
    </Container>
  );
};

export default AccessLabelsAnimation;
