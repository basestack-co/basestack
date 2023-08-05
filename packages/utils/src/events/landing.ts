// Util
import umamiTracker from "./init";

export const navigation = (message: string) => {
  umamiTracker.track("landing-page-navigation", {
    title: "Go to",
    description: message,
  });
};

export const newsletterSuccess = () => {
  umamiTracker.track("request-newsletter-submit", {
    title: "Success",
    description: "Successfully added to the waiting list",
  });
};

export const newsletterError = (message: string) => {
  umamiTracker.track("request-newsletter-submit", {
    title: "Error",
    description: message,
  });
};

export const emailInputFocus = () => {
  umamiTracker.track("email-input-focus", {
    title: "onFocus",
    description: "Email Input Field Focus",
  });
};

export const featureSliderButton = (message: string) => {
  umamiTracker.track("slider-card-button", {
    title: "Feature Slider",
    description: message,
  });
};

export const privacyLink = () => {
  umamiTracker.track("privacy-link", {
    title: "onClick",
    description: "Privacy Policy Link",
  });
};
