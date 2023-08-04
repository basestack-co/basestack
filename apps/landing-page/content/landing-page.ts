import { IllustrationVariant } from "../components";

export const platform = [
  {
    title: "Release Features",
    text: "Unlock release flexibility with Feature Flags. Manage everything in one dashboard and get started with our SDKs.",
    illustration: IllustrationVariant.Binoculars,
  },
  {
    title: "Decision Making",
    text: "Empower your decisions with Feature Flags. Optimize product releases without the Developer involvement.",
    illustration: IllustrationVariant.WindowLoading,
  },
  {
    title: "Flexible Workflow",
    text: "Our Platform adapts to your specific needs. The perfect feature flagging tool for your developers and testers.",
    illustration: IllustrationVariant.Browser,
  },
];

export const why = [
  {
    title: "Maximize Flag Benefits",
    text: "Feature flags (also known as feature switches, feature toggles, conditional features, etc.) are a powerful technique that allows developers and teams to modify system behavior without changing the underlying code.",
    illustration: IllustrationVariant.Binoculars,
  },
  {
    title: "Minimize Implementation Debt",
    text: "Feature Flags are like variables used in conditional statements. They allow you to toggle 'on or off' blocks of code, similar to commenting out code. This gives developers the flexibility to control the flow of their software and bypass features that are not ready for deployment.",
    illustration: IllustrationVariant.WindowLoading,
  },
  {
    title: "Feature Flags vs. Branching",
    text: "Feature branching allows developers to collaborate effectively around a central code base by keeping all changes to a specific feature in its own branch. By adding feature flags to the mix, feature branching becomes even more powerful and faster, separating feature release management from code deployment.",
    illustration: IllustrationVariant.Browser,
  },
];

export const questions = [
  {
    title: "What are the requirements for self-hosting?",
    text: "Any service that can host a NextJS applications with serverless function support and provide a Postgres database compatible with serverless environments will work seamlessly. Consider services such as Neon, Supabase, or traditional Postgres with connection pooling like PgBouncer.",
  },
  {
    title: "What are the supported databases?",
    text: "The platform uses PostgreSQL as the database. The crucial aspect here is to ensure that the PostgreSQL service or instance supports serverless environments.",
  },
];

export const slides = [
  {
    icon: "flag",
    title: "Manage Multiple Projects Easily",
    text: "Control feature releases across multiple projects and environments.",
    image: {
      src: "/images/flags_cards_popups.png",
      alt: "An image of a feature flag control panel displaying multiple projects and environments, with intuitive controls for easily managing feature releases.",
    },
  },
  {
    icon: "history",
    title: "Confident Feature Flag Control",
    text: "Streamlined management, monitoring, and automated change tracking.",
    image: {
      src: "/images/flag_history.png",
      alt: "An image of a feature flag dashboard displaying streamlined management, monitoring, and automated change tracking features. The dashboard provides clear and concise data visualization and intuitive controls for easy navigation and management.",
    },
  },
  {
    icon: "send",
    title: "Efficient Remote Configuration",
    text: "Optimize your feature flag config with dynamic payload data changes.",
    image: {
      src: "/images/create_flag_advanced.png",
      alt: "An image of a feature flag configuration interface, displaying dynamic payload data changes. The interface provides intuitive controls for easily making and testing feature flag changes.",
    },
  },
];

export const waitingList = [
  {
    icon: "flag",
    title: "Manage Multiple Projects Easily",
    text: "Control feature releases across multiple projects and environments.",
    image: {
      src: "/images/flags_cards_popups.png",
      alt: "An image of a feature flag control panel displaying multiple projects and environments, with intuitive controls for easily managing feature releases.",
    },
  },
  {
    icon: "history",
    title: "Confident Feature Flag Control",
    text: "Streamlined management, monitoring, and automated change tracking.",
    image: {
      src: "/images/flag_history.png",
      alt: "An image of a feature flag dashboard displaying streamlined management, monitoring, and automated change tracking features. The dashboard provides clear and concise data visualization and intuitive controls for easy navigation and management.",
    },
  },
  {
    icon: "send",
    title: "Efficient Remote Configuration",
    text: "Optimize your feature flag config with dynamic payload data changes.",
    image: {
      src: "/images/create_flag_advanced.png",
      alt: "An image of a feature flag configuration interface, displaying dynamic payload data changes. The interface provides intuitive controls for easily making and testing feature flag changes.",
    },
  },
];
