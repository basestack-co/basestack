import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated, config } from "react-spring";
import { events } from "@basestack/utils";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  IconBox,
  Text,
  LogoProps,
} from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  RightColumn,
} from "./styles";

interface ProductNavigationProps {
  items: Array<{
    text: string;
    href: string;
    icon: string;
    isExternal?: boolean;
  }>;
  button: {
    text: string;
    href: string;
  };
  product: LogoProps["product"];
}

const AnimatedContentContainer = animated(ContentContainer);

const ProductNavigation = ({
  items,
  button,
  product,
}: ProductNavigationProps) => {
  const { isDarkMode, colors, spacing } = useTheme();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = useSpring({
    maxWidth: scrollY >= 64 ? 1400 : 1100,
    config: config.default,
  });

  return (
    <Container>
      <AnimatedContentContainer style={styles}>
        <LeftColumn>
          <IconBox
            size="medium"
            icon={product === "flags" ? "flag" : "description"}
            backgroundColor={isDarkMode ? colors.gray900 : colors.gray50}
          />
          <Text ml={spacing.s3} size="medium">
            {product === "flags" ? "Flags" : "Forms"}
          </Text>
        </LeftColumn>
        <RightColumn>
          <List>
            {items.map((item, index) => (
              <ListItem key={index.toString()}>
                <Button
                  icon={item.icon}
                  iconPlacement="left"
                  variant={ButtonVariant.Tertiary}
                  onClick={() => {
                    events.landing.navigation(item.text, item.href);
                    if (item.isExternal) {
                      window.open(item.href, "_blank");
                    } else {
                      router.push(item.href);
                    }
                  }}
                  size={ButtonSize.Normal}
                  backgroundColor="transparent"
                >
                  {item.text}
                </Button>
              </ListItem>
            ))}
          </List>
          <Button
            onClick={() => window.open(button.href, "_blank")}
            size={ButtonSize.Normal}
            variant={ButtonVariant.Primary}
          >
            {button.text}
          </Button>
        </RightColumn>
      </AnimatedContentContainer>
    </Container>
  );
};

export default ProductNavigation;
