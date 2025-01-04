import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function LayoutHome({ children }) {
  // Add more routes as needed



  // Check if the current path starts with "/voice"
 

  return (
    <>
       <Navbar/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}

export default LayoutHome;
