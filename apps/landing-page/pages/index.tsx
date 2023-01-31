// Layout
import MainLayout from "../layouts/Main";
// Components
import { Navigation, Hero, Footer, Banner, Cards } from "../components";
import { FooterContainer } from "./styles";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Cards />
      <FooterContainer>
        <Banner />
        <Footer />
      </FooterContainer>
    </>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
