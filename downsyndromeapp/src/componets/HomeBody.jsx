import React from "react";
import homeimage from "../assets/homeimage2.jpg";
import bodyimage from "../assets/value-image.jpg";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function HomeBody() {
 const navigate = useNavigate()
  const login = ()=>{
navigate('/login')
  }
  return (
    <div>
      {/* <div className=" w-full h-full bg-red-400 relative">
        <img src={homeimage} alt="image-home" className=" w-full h-[500px] " />
        <div className=" absolute top-20 py-10 px-10 ml-12">
          <h1 className=" text-5xl text-[#F18F02]  font-bold">
            The Bank Of The Knowledge You Kids{" "}
          </h1>
          <button className=" py-2 px-5  text-white  bg-[#F18F02]">
            Start Now
          </button>
        </div>
      </div> */}
   
      <div className="w-full h-[500px] bg-red-400 relative ">
        {/* Background Image */}
        <img
          src={homeimage}
          alt="image-home"
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute top-1/4 left-12  rounded-lg p-10 lg:ml-24 lg:mr-24 ">
          <h1 className="text-5xl   text-[#e27e02] font-bold mb-6">
            The Bank of Knowledge <br /> for Your Kids
          </h1>
          <button className="py-3 px-6 text-white bg-[#1C4596] rounded-md hover:bg-[#e27e02] transition duration-300" onClick={login}>
            Start Now
          </button>
        </div>
      </div>

      <div className=" mb-8 ">
        <div className="mb-8 sm:ml-2 sm:mr-2  md:ml-5 md:mr-5  lg:ml-60 lg:mr-60 mt-8 grid lg:grid-cols-2 rounded-2xl border border-indigo-600">
          <div className=" rounded-l-lg bg-[#F18F02]">
            <div className=" py-5 px-5">
              <h1 className=" text-7xl text-white">Discover Our Training</h1>
              <p className=" mt-7 text-white ">
                Our training enhances skills to empower you and your people for
                a resilient and rewarding future. Invest in well-being, valuing
                people and securing success through investing in training,
                learning and knowledge.
              </p>
              <p className=" mt-7 text-white  ">
                Our training packages and workshops are designed to offer a
                range of options to meet your unique needs and enhance you and
                your team through providing continual personal and professional
                development.{" "}
              </p>
            </div>
          </div>
          <div className="">
            <div className=" grid grid-cols-2">
              <div className=" py-6 px-6">
                <h1 className=" text-3xl text-[#1C4596]  font-bold mb-3">
                  The Knowledge Draw
                </h1>
                <p>
                  The Knowledge Vault grants you access to our bank of bite
                  size, pre-recorded training presentations where the learning
                  never ends.
                </p>
              </div>
              <div className=" py-6 px-6">
                <h1 className=" text-3xl text-[#1C4596]  font-bold mb-3">
                  The Knowledge Draw
                </h1>
                <p>
                  The Knowledge Vault grants you access to our bank of bite
                  size, pre-recorded training presentations where the learning
                  never ends.
                </p>
              </div>
            </div>
            <div className=" grid grid-cols-2">
              <div className=" py-6 px-6">
                <h1 className=" text-3xl text-[#1C4596]  font-bold mb-3">
                  The Knowledge Draw
                </h1>
                <p>
                  The Knowledge Vault grants you access to our bank of bite
                  size, pre-recorded training presentations where the learning
                  never ends.
                </p>
              </div>
              <div className=" py-6 px-6">
                <h1 className=" text-3xl text-[#1C4596]  font-bold mb-3">
                  The Knowledge Draw
                </h1>
                <p>
                  The Knowledge Vault grants you access to our bank of bite
                  size, pre-recorded training presentations where the learning
                  never ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#D6EDFF]  mt-5 py-14 px-14">
        <div className=" lg:ml-60 lg:mr-60   grid md:grid-cols-1 xl:grid-cols-2 gap-10">
          <div>
            <h1 className=" text-3xl text-[#1C4596]  font-bold mb-3">
              The Value It Brings You
            </h1>
            <p>
              Unlocking a world of possibilities for your personal and
              professional development to pave the way for a resilient future of
              unparalleled success by investing in our training packages and
              workshops, delivered through a variety of different training
              methods to suit your learning style.
            </p>
          </div>
          <div>
            <img src={bodyimage} alt="image-home" className="  rounded-xl   " />
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default HomeBody;
