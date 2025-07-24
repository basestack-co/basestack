import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LifeBuoy, Twitter } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Logo"
        >
          <circle cx={12} cy={12} r={12} fill="black" />
        </svg>
        Basestack Docs
      </>
    ),
  },
  githubUrl: "https://github.com/basestack-co/basestack",
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [
    {
      icon: <LifeBuoy />,
      text: "Help & Support",
      url: "/content/help",
      secondary: false,
    },
    {
      type: "icon",
      label: "Visit Twitter",
      icon: <Twitter />,
      text: "Twitter",
      url: "https://x.com/basestack_co",
    },
  ],
};
