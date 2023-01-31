// Layout
import MainLayout from "../layouts/Main";
// Components
import { Navigation, Hero, Footer, Banner } from "../components";
import { FooterContainer } from "./styles";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <FooterContainer>
        <Banner />
        <Footer />
      </FooterContainer>
    </>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
