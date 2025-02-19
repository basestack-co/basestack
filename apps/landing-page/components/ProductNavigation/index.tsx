import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { events } from "@basestack/utils";
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  LeftColumn,
  List,
  ListItem,
  RightColumn,
} from "./styles";

interface ProductNavigationProps {
  items: Array<{ text: string; href: string; icon: string }>;
  button: {
    text: string;
    href: string;
  };
}

const ProductNavigation = ({ items, button }: ProductNavigationProps) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's running on the client side

    const sectionElements = items
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null); // Remove null values

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = items.findIndex(
              (item) => `#${entry.target.id}` === item.href,
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0.3,
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <Container>
      <ContentContainer>
        <LeftColumn>
          <List>
            {items.map((item, index) => (
              <ListItem isActive={index === activeIndex} key={index.toString()}>
                <Button
                  icon={item.icon}
                  iconPlacement="left"
                  variant={ButtonVariant.Tertiary}
                  onClick={() => {
                    events.landing.navigation(item.text, item.href);
                    router.push(item.href);
                  }}
                  size={ButtonSize.Normal}
                  backgroundColor="transparent"
                >
                  {item.text}
                </Button>
              </ListItem>
            ))}
          </List>
        </LeftColumn>
        <RightColumn>
          <Button
            onClick={() => window.open(button.href, "_blank")}
            size={ButtonSize.Normal}
            variant={ButtonVariant.Primary}
          >
            {button.text}
          </Button>
        </RightColumn>
      </ContentContainer>
    </Container>
  );
};

export default ProductNavigation;
