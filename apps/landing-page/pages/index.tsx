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
  Pricing,
} from "../components";
import { FooterContainer } from "./styles";
import { cards, questions } from "./data";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Hero
        title="Feature Flag Service"
        text="Release features with confidence, manage feature flags across web,
        mobile, and server side applications. Use our hosted API, deploy to your
        own private cloud, or run on-premises"
        image={{
          src: "https://images.pexels.com/photos/3912477/pexels-photo-3912477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          alt: "product demo",
        }}
      />
      <Cards
        title="Feature flags"
        text="MoonFlags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        cards={cards}
      />
      <Pricing />
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
