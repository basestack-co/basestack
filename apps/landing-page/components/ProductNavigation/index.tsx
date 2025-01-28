import React from "react";
// Router
import { useRouter } from "next/navigation";
// Utils
import { events } from "@basestack/utils";
// Components
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

  return (
    <Container>
      <ContentContainer>
        <LeftColumn>
          <List>
            {items.map((item, index) => {
              return (
                <ListItem isActive={index === 0} key={index.toString()}>
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
              );
            })}
          </List>
        </LeftColumn>
        <RightColumn>
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open(button.href, "_blank");
              }
            }}
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
