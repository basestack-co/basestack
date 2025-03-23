import en from "../messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
  }
}

declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      ready: Promise<void>;
    };
  }
}
