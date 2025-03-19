import React,{useState} from 'react'
import Button from "../../../atomes/Button";
import { useNavigate } from "react-router-dom";
import { Lock, Unlock } from "lucide-react"; // Install lucide-react or use react-icons

function pacticelevel() {
  const [isLocked, setIsLocked] = useState(false);

   const navigae = useNavigate();

    const hadleclickwordpage = () => {
       navigae("word");
    };
        const hadleclicksatgeTwopage = () => {
          navigae("stage-two");
        };
            const hadleclickstageThreepage = () => {
              navigae("stage-three");
            };
  return (
    <div className=" lg:grid grid-cols-3 ml-10 mr-8 justify-center ">
      {/* <div className=" h-[500px] w-[300px] bg-white  mt-32 rounded-2xl  shadow-2xl  py-5 px-4  ">
        <div className="h-[500px] w-[300px] bg-white rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mt-20">
            Level 1
          </h1>
          <Button
            styles="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-5"
            buttonname="Start Practice"
            Onclicks={hadleclickwordpage}
          />
        </div>
      </div> */}
      <div className="h-[500px] w-[300px] bg-white mt-32 rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center border-4 border-yellow-400">
        <div className="h-full w-full flex flex-col items-center text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 mt-10">
            🏆 Level 1
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Let's start the adventure! 🚀
          </p>

          <div className="mt-6 w-20 h-20 bg-yellow-400 flex items-center justify-center rounded-full shadow-md animate-bounce">
            <span className="text-4xl text-white">✨</span>
          </div>

          <Button
            styles="bg-[#F18F02] font-bold py-3 rounded-full hover:bg-blue-900 hover:text-white transition duration-300 text-white px-6 mt-6 shadow-lg"
            buttonname="🚀 Start Practice"
            Onclicks={hadleclickwordpage}
          />
        </div>
      </div>
      <div className="h-[500px] w-[300px] bg-white rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center mt-2 border-4 border-green-400">
        {isLocked ? (
          <Lock size={90} className="text-gray-500 animate-pulse mt-32" />
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold text-green-600 mt-10">
              🏆 Level 2
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Keep up the great work! You’re doing amazing! 🎉
            </p>

            <div className="mt-6 w-20 h-20 bg-green-400 flex items-center justify-center rounded-full shadow-md animate-bounce">
              <span className="text-4xl text-white">🌟</span>
            </div>

            <Button
              styles="bg-[#F18F02] font-bold py-3 rounded-full hover:bg-blue-900 hover:text-white transition duration-300 text-white px-6 mt-6 shadow-lg"
              buttonname="🎯 Start Practice"
              Onclicks={hadleclicksatgeTwopage}
            />
          </div>
        )}
      </div>

      {/* <div className="h-[500px] w-[300px] bg-white rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center mt-2">
        {isLocked ? (
          <Lock size={90} className="text-gray-500  animate-pulse mt-32" />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mt-20">
              Level 2
            </h1>
            <Button
              styles="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-5"
              buttonname="Start Practice"
              Onclicks={hadleclicksatgeTwopage}
            />
          </div>
        )}
      </div> */}
      <div className="h-[500px] w-[300px] bg-white rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center mt-32 border-4 border-blue-400">
        {isLocked ? (
          <Lock size={90} className="text-gray-500 animate-pulse mt-32" />
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold text-blue-600 mt-10">
              🚀 Level 3
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              You're almost there! Keep going! 💪
            </p>

            <div className="mt-6 w-20 h-20 bg-blue-400 flex items-center justify-center rounded-full shadow-md animate-bounce">
              <span className="text-4xl text-white">✨</span>
            </div>

            <Button
              styles="bg-[#F18F02] font-bold py-3 rounded-full hover:bg-blue-900 hover:text-white transition duration-300 text-white px-6 mt-6 shadow-lg"
              buttonname="🎯 Start Practice"
              Onclicks={hadleclickstageThreepage}
            />
          </div>
        )}
      </div>

      {/* <div className=" h-[500px] w-[300px] bg-white  mt-32 rounded-2xl  shadow-2xl  py-5 px-4  ">
        <div className="h-[500px] w-[300px] bg-white rounded-2xl shadow-2xl py-5 px-4 flex flex-col items-center text-center">
          {isLocked ? (
            <Lock size={90} className="text-gray-500  animate-pulse mt-32" />
          ) : (
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mt-20">
                Level 3
              </h1>
              <Button
                styles="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-5"
                buttonname="Start Practice"
                Onclicks={hadleclickstageThreepage}
              />
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default pacticelevel
