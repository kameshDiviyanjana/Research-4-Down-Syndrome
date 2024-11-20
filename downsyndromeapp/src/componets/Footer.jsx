import React from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";

function Footer() {
  return (
    <div className=" w-full h-full bg-[#1C4596] py-16 px-11">
      {" "}
      <div className=" grid md:grid-cols-1 xl:grid-cols-2 gap-6 ml-10 mr-10">
        <div>
          <p className=" text-white  text-left lg:mt-12">
            Unlocking a world of possibilities for your personal and
            professional development. Empowering you and your people to pave the
            way for a resilient future of unparalleled success.{" "}
          </p>
        </div>
        {/* <div className=" flex lg:flex-wrap gap-11">
          <div>
            <h1 className=" text-[#F18F02] mb-4">Menu</h1>
            <ul>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className=" text-[#F18F02] mb-4">Menu</h1>
            <ul>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" text-white">
                <Link to={"forest"}> Firea</Link>
              </li>
            </ul>
          </div>
          <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-[#F18F02] mb-6 ">
              Contact
            </h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter your message"
                className="flex-grow border border-gray-300 rounded-md h-10 px-4 focus:outline-none focus:ring-2 focus:ring-[#F18F02]"
              />
              <button className="bg-[#F18F02] hover:bg-[#e27e02] text-white rounded-md h-10 px-6 transition duration-300">
                Click
              </button>
            </div>
          </div>
        </div> */}
        <div className="flex flex-wrap lg:gap-11 gap-6 p-4 ">
          {/* First Menu Section */}
          <div>
            <h1 className="text-[#F18F02] text-lg font-bold mb-4">Menu</h1>
            <ul>
              {Array(4)
                .fill("Firea")
                .map((item, index) => (
                  <li key={index} className="text-white mb-2">
                    <Link to={"forest"}>{item}</Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Second Menu Section */}
          <div>
            <h1 className="text-[#F18F02] text-lg font-bold mb-4">Menu</h1>
            <ul>
              {Array(4)
                .fill("Firea")
                .map((item, index) => (
                  <li key={index} className="text-white mb-2">
                    <Link to={"forest"}>{item}</Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-[#F18F02] mb-6">Contact</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter your message"
                className="flex-grow border border-gray-300 rounded-md h-10 px-4 focus:outline-none focus:ring-2 focus:ring-[#F18F02]"
              />
              <button className="bg-[#F18F02] hover:bg-[#e27e02] text-white rounded-md h-10 px-6 transition duration-300">
                Click
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
