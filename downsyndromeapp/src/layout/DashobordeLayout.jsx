
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../componets/Footer";
import DashbordHeder from "../Heders/DashbordHeder";

function DashobordeLayout({ children }) {
 // Add more routes as needed

 const location = useLocation();

 // Check if the current path starts with "/voice"
 const shouldShowFooter = !location.pathname.startsWith("/voice");

  return (
    <>
      {<DashbordHeder/>}
      <main>{children}</main>
      { shouldShowFooter &&<Footer />}
    </>
  );
}

export default DashobordeLayout;