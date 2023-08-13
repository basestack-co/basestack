// Util
import umamiTracker from "./init";

export const navigation = (title: string, description: string) => {
  umamiTracker.track("landing-page-navigation", {
    title,
    description,
  });
};

export const deploy = (title: string) => {
  umamiTracker.track("deploy-option-button", {
    title,
  });
};

export const slider = (title: string, description: string) => {
  umamiTracker.track("features-slider-button", {
    title,
    description,
  });
};

export const code = (title: string) => {
  umamiTracker.track("code-tab-select", {
    title,
  });
};

export const question = (title: string, description: string) => {
  umamiTracker.track("accordion-question-click", {
    title,
    description,
  });
};

export const goToDocs = () => {
  umamiTracker.track("go-to-documentation-click", {
    title: "Explore the documentation",
    description: "Clicked to go to the documentation",
  });
};

export const gotToGitHubRepo = () => {
  umamiTracker.track("go-to-github-repo-click", {
    title: "Explore the Github Repo",
    description: "Clicked to go to the source code repo",
  });
};

export const link = (title: string, description: string) => {
  umamiTracker.track("landing-link-click", {
    title,
    description,
  });
};

export const newsletter = (title: string, description: string) => {
  umamiTracker.track("landing-newsletter-button-click", {
    title,
    description,
  });
};
