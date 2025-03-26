import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
// Components
import useEmblaCarousel from "embla-carousel-react";
import { animated, useSpring, config } from "react-spring";
import {
  Text,
  Button,
  Icon,
  ButtonSize,
  ButtonVariant,
  HorizontalRule,
  Segment,
} from "@basestack/design-system";
// Hooks
import { useMedia } from "react-use";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { useTheme } from "styled-components";
import { rem } from "polished";
import SectionHeader from "../SectionHeader";
import {
  Container,
  ContentContainer,
  Embla,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  FloatingLabel,
  List,
  ListItem,
  PriceContainer,
  HeaderContainer,
  Span,
} from "./styles";
import { Card } from "../styles";
// Utils
import { config as defaults } from "@basestack/utils";
import CarouselButtons from "../CarouselButtons";

const { urls } = defaults;

type Interval = "monthly" | "yearly";

interface CardProps {
  title: string;
  price: string | { monthly: string; yearly: string };
  button: string;
  description: string;
  listDescription?: string;
  list: Array<{ text: string; icon?: string }>;
  isCustom?: boolean;
  isPopular?: boolean;
  onClick: () => void;
  interval: Interval;
}

const AnimatedSpan = animated(Span);

const CardComp = ({
  title,
  price,
  button,
  description,
  onClick,
  list,
  listDescription,
  isCustom = false,
  isPopular = false,
  interval,
}: CardProps) => {
  const t = useTranslations();
  const { spacing, colors, isDarkMode } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);

  const textColor = isDarkMode ? colors.gray300 : colors.black;
  const popularIconColor = isDarkMode ? colors.blue300 : colors.primary;

  const value =
    typeof price !== "string" && price[interval]?.replace(/[^\d.-]/g, "");

  const symbol =
    typeof price !== "string" && price[interval]?.replace(/[0-9.-]/g, "");

  const valueNumber = +value || 0;

  const valueAnimation = useSpring({
    from: { x: 0 },
    to: { x: valueNumber },
    config: { ...config.stiff, duration: 1000 },
  });

  const [colorAnimation, setColorAnimation] = useSpring(() => ({
    from: { color: textColor },
    to: { color: textColor },
    config: { ...config.stiff, duration: 1000 },
  }));

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    const targetColor =
      interval === "monthly" ? colors.red400 : colors.green400;

    setColorAnimation({
      to: { color: targetColor },
      reset: true,
      onRest: () => {
        setColorAnimation({ to: { color: textColor }, reset: true });
      },
    });
  }, [
    colors.green400,
    colors.red400,
    hasMounted,
    interval,
    setColorAnimation,
    textColor,
  ]);

  return (
    <Card>
      <Text size="xLarge" fontWeight={500}>
        {title}
      </Text>
      <PriceContainer>
        {!isCustom && (
          <FloatingLabel>
            <Text lineHeight="1" size="small" muted>
              {t("common.pricing.segment.from")}
            </Text>
          </FloatingLabel>
        )}
        <Text fontSize={rem("42px")} lineHeight="1" fontWeight={500}>
          {typeof price === "string" ? (
            price
          ) : (
            <>
              {symbol}
              <AnimatedSpan style={colorAnimation}>
                {valueAnimation.x.to((n) => n.toFixed(2))}
              </AnimatedSpan>
            </>
          )}
          {!isCustom && (
            <Text as="span" lineHeight="1" size="small" ml="2px" muted>
              {t("common.pricing.segment.month")}
            </Text>
          )}
        </Text>
      </PriceContainer>
      <Button
        onClick={onClick}
        fullWidth
        justifyContent="center"
        size={ButtonSize.Medium}
        variant={isPopular ? ButtonVariant.Primary : ButtonVariant.Outlined}
      >
        {button}
      </Button>
      <Text size="medium" fontWeight={400} mt={spacing.s5} muted>
        {description}
      </Text>
      <HorizontalRule my={spacing.s5} />
      {listDescription && (
        <Text size="medium" fontWeight={400} mb={spacing.s3}>
          {listDescription}
        </Text>
      )}
      <List>
        {list?.map(({ text, icon }, index) => (
          <ListItem key={index}>
            {icon && (
              <Icon
                icon={icon}
                size="medium"
                color={isPopular ? popularIconColor : textColor}
              />
            )}
            <Text size="medium" fontWeight={400} ml={spacing.s3}>
              {text}
            </Text>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

type OmitMultiple<T, K extends keyof T> = Omit<T, K>;

interface PricingProps {
  id?: string;
  title: string;
  caption?: string;
  text: string;
  product: string;
  items: Array<OmitMultiple<CardProps, "onClick" | "interval">>;
  segment?: Array<{ id: string; text: string; label?: string }>;
}

const Pricing = ({
  title,
  caption,
  text,
  items,
  id,
  segment = [],
  product,
}: PricingProps) => {
  const router = useRouter();
  const { device, spacing } = useTheme();
  const isDesktop = useMedia(device.min.xl, true);
  const isMobile = useMedia(device.max.sm, false);

  const [selectedInterval, setSelectedInterval] = useState<Interval>("monthly");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: !isDesktop,
    align: "start",
    slidesToScroll: 1,
  });

  const indexPopularItem = useMemo(
    () => items.findIndex((item) => item.isPopular),
    [items],
  );

  const onClick = useCallback(
    (isCustom?: boolean) => {
      if (isCustom) {
        return router.push("/enterprise");
      }

      const productUrls: Record<string, string> = {
        forms: urls.app.production.forms,
        flags: urls.app.production.flags,
      };

      const targetUrl = productUrls[product];
      if (targetUrl) {
        window.open(targetUrl, "_blank");
      }
    },
    [product, router],
  );

  useEffect(() => {
    if (isMobile && emblaApi) {
      emblaApi.scrollTo(indexPopularItem);
    }
  }, [emblaApi, isMobile, indexPopularItem]);

  return (
    <Container id={id}>
      <ContentContainer>
        <HeaderContainer>
          <SectionHeader title={title} text={text} caption={caption} />
          <Segment
            selectedIndex={selectedInterval === "monthly" ? 0 : 1}
            onSelect={(interval) => {
              setSelectedInterval(interval.toLowerCase() as Interval);
            }}
            items={segment}
            mb={spacing.s5}
          />
        </HeaderContainer>
        <Embla>
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {items.map((item, index) => (
                <EmblaSlide key={index}>
                  <CardComp
                    isCustom={item.isCustom}
                    isPopular={item.isPopular}
                    title={item.title}
                    price={item.price}
                    button={item.button}
                    description={item.description}
                    listDescription={item.listDescription}
                    list={item.list}
                    onClick={() => onClick(item.isCustom)}
                    interval={selectedInterval}
                  />
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>
        </Embla>
        <CarouselButtons emblaApi={emblaApi} hasMarginTop />
      </ContentContainer>
    </Container>
  );
};

export default Pricing;
