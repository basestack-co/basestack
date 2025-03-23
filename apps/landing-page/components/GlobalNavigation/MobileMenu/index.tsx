import React from "react";
import { Button, ButtonVariant, Text } from "@basestack/design-system";
import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";
import {
  animated,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from "react-spring";
import {
  List,
  PopupContainer,
  ListItem,
  ContentWrapper,
  ContentContainer,
  GlobalStyle,
} from "./styles";

interface MobileNavigationProps {
  links: {
    title: string;
    data: Array<{
      text: string;
      href: string;
      isExternal: boolean;
    }>;
  };
  products: {
    title: string;
    data: Array<{
      title: string;
      description: string;
      icon: string;
      onClick: () => void;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedContainer = animated(ContentContainer);
const AnimatedWrapper = animated(ContentWrapper);

const Title = ({ title }: { title: string }) => {
  const { spacing } = useTheme();
  return (
    <Text size="xSmall" muted fontWeight={500} px={spacing.s3} mb={spacing.s2}>
      {title.toUpperCase()}
    </Text>
  );
};

const MobileNavigation = ({
  links,
  products,
  isOpen,
  onClose,
}: MobileNavigationProps) => {
  const router = useRouter();

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: "0", opacity: 0 },
    to: {
      size: isOpen ? "100%" : "0",
      opacity: isOpen ? 1 : 0,
    },
  });

  const transApi = useSpringRef();

  const fadeStyles = useSpring({
    opacity: isOpen ? 1 : 0,
    config: config.stiff,
  });

  useChain(isOpen ? [springApi, transApi] : [transApi, springApi], [
    0,
    isOpen ? 0.3 : 0.4,
  ]);

  return (
    <>
      {isOpen && <GlobalStyle />}
      <PopupContainer isOpen={isOpen}>
        <AnimatedContainer style={{ ...rest, width: size, height: size }}>
          <AnimatedWrapper style={fadeStyles}>
            <Title title={products.title} />
            <List>
              {products.data.map((item, index) => (
                <ListItem key={`product-${index}`}>
                  <Button
                    variant={ButtonVariant.Neutral}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                    iconPlacement="left"
                    icon={item.icon}
                    fullWidth
                  >
                    {item.title}
                  </Button>
                </ListItem>
              ))}
            </List>

            <Title title={links.title} />
            <List>
              {links.data.map((item, index) => (
                <ListItem key={`link-${index}`}>
                  <Button
                    variant={ButtonVariant.Neutral}
                    onClick={() => {
                      if (item.isExternal) {
                        window.open(item.href, "_blank");
                      } else {
                        router.push(item.href);
                      }
                      onClose();
                    }}
                    fullWidth
                  >
                    {item.text}
                  </Button>
                </ListItem>
              ))}
            </List>
          </AnimatedWrapper>
        </AnimatedContainer>
      </PopupContainer>
    </>
  );
};

export default MobileNavigation;
