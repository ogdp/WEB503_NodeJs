import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <section>
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Homepage;
