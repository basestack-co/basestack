// Util
import { saEvent } from "./init";

export const navigation = (title: string, description: string) => {
  saEvent("landing-page-navigation", {
    title,
    description,
  });
};

export const deploy = (title: string) => {
  saEvent("deploy-option-button", {
    title,
  });
};

export const slider = (title: string, description: string) => {
  saEvent("features-slider-button", {
    title,
    description,
  });
};

export const code = (title: string) => {
  saEvent("code-tab-select", {
    title,
  });
};

export const question = (title: string, description: string) => {
  saEvent("accordion-question-click", {
    title,
    description,
  });
};

export const goToDocs = () => {
  saEvent("go-to-documentation-click", {
    title: "Explore the documentation",
    description: "Clicked to go to the documentation",
  });
};

export const gotToGitHubRepo = () => {
  saEvent("go-to-github-repo-click", {
    title: "Explore the Github Repo",
    description: "Clicked to go to the source code repo",
  });
};

export const link = (title: string, description: string) => {
  saEvent("landing-link-click", {
    title,
    description,
  });
};

export const newsletter = (title: string, description: string) => {
  saEvent("landing-newsletter-button-click", {
    title,
    description,
  });
};
