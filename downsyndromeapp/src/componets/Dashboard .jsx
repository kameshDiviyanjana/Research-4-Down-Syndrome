import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import mic from "../assets/mic-svgrepo-com.svg";
import write from "../assets/write-document-svgrepo-com.svg";
import math from "../assets/maths-svgrepo-com.svg";
import teach from "../assets/teacher-svgrepo-com.svg";
import Button from "./molecule/Button";
import studing from "../assets/second-language-social.jpg";
import mathlearn from "../assets/maths.avif";
import happy from "../assets/happy.webp";
import readbook from "../assets/read-books.jpeg";
function Dashboard() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const drawpage = () => {
   
    navigate("/draw"); // Navigate to the nested 'kkk' route
  };
  const voiceNavigate = () => {
    navigate("/voice");
  };
  const grossmotoSkill = () => {
    navigate("/skills");
  };
  const mathpage = () => {
    navigate("/math");
  };

  return (
    <div>
      <div className=" py-4 px-6">
        {/* <div className="  lg:ml-60 lg:mr-60">
          <div className=" py-16 px-12">
            <div className="  grid grid-cols-2 ">
              <div className=" border-r-2 border-b-2 border-[#F18F02] flex justify-center py-6 px-7">
                <img
                  src={mic}
                  alt="image"
                  className=" h-48"
                  onClick={voiceNavigate}
                />
              </div>
              <div className="border-b-2 border-[#F18F02] flex justify-center py-6 px-7">
                <img src={write} alt="image" className=" h-48" onClick={move} />
              </div>
            </div>
            <div className="  grid grid-cols-2  ">
              <div className="border-r-2  border-[#F18F02] flex justify-center py-12 px-7">
                <img src={math} alt="image" className=" h-48" onClick={move} />
              </div>
              <div className=" flex justify-center py-12 px-7">
                <img src={teach} alt="image" className=" h-48" onClick={move} />
              </div>
            </div>
          </div>
        </div> */}
        <div className="  w-full">
          <div className=" grid lg:grid-cols-2 md:grid-cols-1 ">
            <div className="">
              <img src={readbook} alt="image" className=" h-[500px]" />
            </div>
            <div class="w-2/3 py-20 px-20">
              <h3 class="text-gray-800 font-semibold text-4xl mb-2">
                What our student say!
              </h3>
              <p class="text-gray-600 mb-4">
                Student give feedback about our learning platform.
              </p>
              <div class="relative">
                <span class="absolute text-green-400 text-4xl leading-none">
                  “
                </span>
                <p class="text-gray-700 text-sm leading-relaxed pl-8">
                  The face of the moon was in shadow. The recorded voice
                  scratched in the speaker. The sky was cloudless and of a deep
                  dark.
                </p>
              </div>
              <Button
                styles={
                  "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-5"
                }
                Onclick={() => {
                  voiceNavigate();
                }}
                buttonname="Start Pactices"
              ></Button>
            </div>
          </div>
        </div>
        <div className="  w-full">
          <div className=" grid lg:grid-cols-2 md:grid-cols-1 ">
            <div class="w-2/3 py-20 px-20">
              <h3 class="text-gray-800 font-semibold text-4xl mb-2">
                What our student say!
              </h3>
              <p class="text-gray-600 mb-4">
                Student give feedback about our learning platform.
              </p>
              <div class="relative">
                <span class="absolute text-green-400 text-4xl leading-none">
                  “
                </span>
                <p class="text-gray-700 text-sm leading-relaxed pl-8">
                  The face of the moon was in shadow. The recorded voice
                  scratched in the speaker. The sky was cloudless and of a deep
                  dark.
                </p>
              </div>
              <Button
                styles={
                  "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-8 mt-5"
                }
                Onclick={() => {
                mathpage()
                }}
                buttonname="click"
              ></Button>
            </div>
            <div>
              <img src={mathlearn} alt="image" className=" h-[500px]" />
            </div>
            {/* <Button
              Onclick={() => {
                voiceNavigate();
              }}
              buttonname="click"
            ></Button> */}
          </div>
        </div>
        <div className="  w-full">
          <div className=" grid lg:grid-cols-2 md:grid-cols-1 ">
            <div>
              <img src={studing} alt="image" />
            </div>
            <div class="w-2/3 py-20 px-20">
              <h3 class="text-gray-800 font-semibold text-4xl mb-2">
                What our student say!
              </h3>
              <p class="text-gray-600 mb-4">
                Student give feedback about our learning platform.
              </p>
              <div class="relative">
                <span class="absolute text-green-400 text-4xl leading-none">
                  “
                </span>
                <p class="text-gray-700 text-sm leading-relaxed pl-8">
                  The face of the moon was in shadow. The recorded voice
                  scratched in the speaker. The sky was cloudless and of a deepd
                  dark.
                </p>
              </div>
              <Button
                styles={
                  "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-8 mt-5"
                }
                Onclick={() => {
                 drawpage()
                }}
                buttonname="click"
              ></Button>
            </div>
          </div>
        </div>{" "}
        <div className="  w-full">
          <div className=" grid lg:grid-cols-2 md:grid-cols-1 ">
            <div class="w-2/3 py-20 px-20">
              <h3 class="text-gray-800 font-semibold text-4xl mb-2">
                What our student say!
              </h3>
              <p class="text-gray-600 mb-4">
                Student give feedback about our learning platform.
              </p>
              <div class="relative">
                <span class="absolute text-green-400 text-4xl leading-none">
                  “
                </span>
                <p class="text-gray-700 text-sm leading-relaxed pl-8">
                  The face of the moon was in shadow. The recorded voice
                  scratched in the speaker. The sky was cloudless and of a deep
                  dark.
                </p>
              </div>
              <Button
                styles={
                  "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-8 mt-5"
                }
                Onclick={() => {
                 grossmotoSkill()
                }}
                buttonname="click"
              ></Button>
            </div>
            <div>
              <img src={happy} alt="image" className=" h-[450px]" />
            </div>
          </div>
        </div>
        {/* Renders nested routes */}
      </div>
      {/* <Outlet /> */}
    </div>
  );
}

export default Dashboard;
