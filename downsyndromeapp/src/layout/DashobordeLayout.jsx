
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../componets/Footer";
import DashbordHeder from "../Heders/DashbordHeder";

function DashobordeLayout({ children }) {


  return (
    <>
      {<DashbordHeder/>}
      <main>{children}</main>
      { <Footer />}
    </>
  );
}

export default DashobordeLayout;