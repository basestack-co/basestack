import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSpring, animated, config } from "react-spring";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  IconBox,
  LogoProps,
} from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  RightColumn,
  StyledButton,
  Title,
} from "./styles";
import Dropdown from "./Dropdown";

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

const MAIN_NAN_HEIGHT = 64;

const ProductNavigation = ({
  items,
  button,
  product,
}: ProductNavigationProps) => {
  const { isDarkMode, colors, spacing, typography } = useTheme();
  const router = useRouter();
  const [maxWidth, setMaxWidth] = useState(1100);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll >= MAIN_NAN_HEIGHT) {
        setMaxWidth(1400);
      } else if (currentScroll <= MAIN_NAN_HEIGHT / 2) {
        setMaxWidth(1100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = useSpring({
    maxWidth,
    config: config.default,
  });

  return (
    <Container>
      <AnimatedContentContainer style={styles}>
        <LeftColumn>
          <StyledButton
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <IconBox
              size="medium"
              icon={product === "flags" ? "flag" : "description"}
              backgroundColor={isDarkMode ? colors.gray900 : colors.gray50}
            />
          </StyledButton>
          <Title ml={spacing.s3} size="medium">
            {product === "flags" ? "Flags" : "Forms"}
          </Title>
          {/* Mobile */}
          <Dropdown
            title={product === "flags" ? "Flags" : "Forms"}
            data={items}
          />
        </LeftColumn>
        <RightColumn>
          <List>
            {items.map((item, index) => (
              <ListItem key={index.toString()}>
                <Button
                  icon={item.icon}
                  iconPlacement="left"
                  variant={ButtonVariant.Neutral}
                  onClick={() => {
                    if (item.isExternal) {
                      window.open(item.href, "_blank");
                    } else {
                      router.push(item.href);
                    }
                  }}
                  size={ButtonSize.Normal}
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
