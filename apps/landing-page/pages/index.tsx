// Layout
import MainLayout from "../layouts/Main";
// Components
import { Navigation, Hero, Footer } from "../components";

const MainPage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <Footer />
    </>
  );
};

MainPage.Layout = MainLayout;

export default MainPage;
