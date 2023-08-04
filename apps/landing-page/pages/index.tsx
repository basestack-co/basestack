import React from "react";
import { useIsTop } from "@basestack/hooks";
// Components
import {
  Navigation,
  Hero,
  Footer,
  Banner,
  Cards,
  Questions,
  Pricing,
  Slider,
  Code,
} from "components";
import { DarkContainer } from "styles";
// Data
import { cards, questions, slides } from "content/landing-page";

const LandingPage = () => {
  const [isDarkSectionTop, darkContainer] = useIsTop({ offSet: 80 });

  return (
    <>
      <Navigation isDarkMode={isDarkSectionTop} />
      <Hero
        title="The Open-Source Feature Flag Platform"
        text="Basestack Feature Flags is a self-hosted platform that offers an effortless way to host your own Feature Flags management system."
        image={{
          src: "/images/flags_cards_popups.png",
          alt: "product demo",
        }}
      />
      <Cards
        id="platform"
        title="Introducing the Platform"
        text="Basestack Feature Flags is a user-friendly platform that simplifies the development, implementation, and management of your feature flags."
        cards={cards}
      />
      <Slider
        id="features"
        title="Discover the Features"
        text="Discover a complete platform for creating, implementing, and managing your feature flags with Basestack Feature Flags."
        data={slides}
      />
      <DarkContainer ref={darkContainer}>
        <Code id="code" />
        <Cards
          title="Feature flags"
          text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
          cards={cards}
          isDarkMode
        />
        <Questions
          title="Frequently Asked Questions"
          text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
          data={questions}
        />
        <Banner />
        <Footer />
      </DarkContainer>
    </>
  );
};

export default LandingPage;
