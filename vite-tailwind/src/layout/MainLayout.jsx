import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Router from "../router/Router";

const MainLayout = () => {
  return (
    // full viewport height
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow mt-16">
        <Router />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
