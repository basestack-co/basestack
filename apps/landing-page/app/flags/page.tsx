"use client";

import React from "react";
// Hooks
import { useIsTop } from "@basestack/hooks";
// Components
import {
  Navigation,
  Hero,
  Footer,
  Banner,
  Cards,
  Questions,
  Slider,
  Code,
} from "components";
// Content
import { platform, why, questions, slides } from "content/landing-page";

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
        cards={platform}
      />
      <Slider
        id="features"
        title="Discover the Features"
        text="Discover a complete platform for creating, implementing, and managing your feature flags with Basestack Feature Flags."
        data={slides}
      />
      <Code id="code" />
      <Cards
        id="why"
        title="Unconvinced about Feature Flags?"
        text="Feature flagging is a powerful technique where developers wrap a new feature in an if/then statement to gain greater control over its release and behavior."
        cards={why}
      />
      <Questions
        id="questions"
        title="Frequently Asked Questions"
        text="Explore our collection of useful questions and answers about the Feature Flags Platform. If you don't find the answer to your question here, feel free to open a discussion on Github."
        data={questions}
      />
      <Banner id="banner" />
      <Footer />
    </>
  );
};

export default LandingPage;
