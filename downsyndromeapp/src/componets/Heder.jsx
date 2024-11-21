import React from 'react'
import { useState } from "react";

import { Link, Outlet } from "react-router-dom";
function Heder() {
    const [enable, setEnable] = useState(true);

    function menyclick() {
      setEnable(!enable);
    }
  return (
    <div>
      <div className="w-full h-full bg-[#1C4596] py-2 px-2 text-white">
        <div className=" w-full  bg-[#1C4596]">
          <div className=" lg:ml-14  lg:mr-14 lg:grid lg:grid-cols-2 gap-3 bg-[#1C4596]  max-lg:grid max-lg:grid-cols-2 ">
            <div className=" lg:mt-2  bg-[#1C4596] ">
              <h4 className=" text-3xl py-3 px-3 font-bold">
                Down<span className=" text-4xl text-red-400">syndrome </span>
                <span className=" font-thin text-5xl">e</span>
              </h4>

              {/* <img src='https://scijinks.gov/science/science-03.png'   className='w-[150px] h-[60px] max-lg:justify-center'/> */}
            </div>
            <div className=" hidden max-md:block    ">
              <div className=" flex justify-end py-1 px-2">
                {enable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8   text-white  flex justify-end mt-7"
                    onClick={menyclick}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-8 h-8   text-white  flex justify-end mt-7 "
                    onClick={menyclick}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="   mt-2 bg-[#1C4596]  max-lg:hidden">
              <ul class="mr-8 lg:flex lg:flex-1 items-center  justify-end gap-6 py-4 px-4  text-white">
                <li className=" bg-[#1C4596]  h-7 w-[90px] flex col-span-2 gap-2  cursor-pointer  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 mt-1 max-lg:hidden"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  {/* <a className=" cursor-pointer">SING IN |</a> */}
                  <Link to={"login"}> SING IN</Link>
                </li>
                <li className=" bg-[#1C4596]  cursor-pointer">
                  <a>JOIN NOW |</a>
                </li>

                <li className=" bg-[#1C4596]  cursor-pointer  ">
                  <a>FIND RESERVETION |</a>
                </li>
                <li className=" bg-[#1C4596]  h-7 w-[90px] flex col-span-2 gap-2  mt-1  cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 max-lg:hidden"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>

                  <a>ENGLISH </a>
                </li>
                <li className=" bg-[#1C4596]  cursor-pointer ">
                  <a>LKR |</a>
                </li>
                <li className=" bg-blue-90  cursor-pointer0  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-black max-lg:hidden "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" w-full h-full  bg-[#1C4596]  ">
          <div>
            <ul
              className={`text-center md:flex    md:flex-1  justify-center   py-1 px-1  font-semibold max-xl:gap-5${
                enable && " max-md:hidden"
              }`}
            >
              <li className=" lg:w-[250px]">
                <Link to={""}>Home</Link>
              </li>
              <li className=" relative group  lg:w-[250px]">
                <Link> Wether</Link>
                {/* <ul className='  absolute bg-green-200  top-5 left-0 hidden group-hover:block    w-full'>
                    
                   <li className=' hover:bg-red-300 h-[20px]'><Link to={""}>HOME </Link></li>
                   <li className=' hover:bg-red-300'><Link to={""}>HOME</Link></li>
                   <li className=' hover:bg-red-300'><Link to={""}>HOME</Link></li>
                   <li className=' hover:bg-red-300'><Link to={""}>HOME</Link></li>
                   </ul> */}
              </li>
              <li className=" lg:w-[250px]">
                <Link to={"forest"}> Firea</Link>
              </li>
              <li className=" lg:w-[250px]">
                <Link to={"/mass"}> Day image</Link>
              </li>
              <li className=" lg:w-[250px]">
                <Link to={"mash"}>Mas Image</Link>
              </li>
            </ul>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Heder
