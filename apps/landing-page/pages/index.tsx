// Layout
import MainLayout from "../layouts/Main";
// Components
import {
  Navigation,
  Hero,
  Footer,
  Banner,
  Cards,
  Questions,
} from "../components";
import { FooterContainer } from "./styles";
import { cards, questions } from "./data";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Cards
        title="Feature flags"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        cards={cards}
      />
      <Questions
        title="Frequently Asked Questions"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        data={questions}
      />
      <Cards
        title="Feature flags"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        cards={cards}
        isDarkMode
      />
      <FooterContainer>
        <Banner />
        <Footer />
      </FooterContainer>
    </>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
