import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Heder";
import Footer from "./Footer";

function Layout({ children }) {



  return (
    <>
      { <Header />}
      <main>{children}</main>
      { <Footer />}
    </>
  );
}

export default Layout;
