const meta = {
  index: {
    title: "Home",
    type: "page",
  },
  "feature-flags": {
    title: "Feature Flags",
    type: "page",
  },
  forms: {
    title: "Forms",
    type: "page",
  },
  "self-hosting": {
    title: "Self-Hosting",
    type: "page",
  },
  "---": {
    type: "separator",
  },
  company: {
    title: "Platform",
    type: "menu",
    items: {
      faqs: {
        title: "FAQs",
        href: "/faqs",
      },
      updates: {
        title: "Getting Updates",
        href: "/updates",
      },
      help: {
        title: "Help & Support",
        href: "/help",
      },
      contributing: {
        title: "Contributing",
        href: "/contributing",
      },
      license: {
        title: "License",
        href: "/license",
      },
      about: {
        title: "About ↗",
        href: "https://basestack.co/",
        newWindow: true,
      },
      contact: {
        title: "Contact Us",
        href: "mailto:support@basestack.co",
      },
    },
  },
};

export default meta;
