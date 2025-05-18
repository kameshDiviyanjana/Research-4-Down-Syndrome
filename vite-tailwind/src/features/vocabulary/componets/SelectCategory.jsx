import React, { useState } from "react";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
import Vehicale from "../../../utile/Vehicale.json";
import car from "../../../assets/car55.jpeg";
import Motorcycle from "../../../assets/bike.jpeg";
import Bicycle from "../../../assets/bicycle.jpeg";
import Lory from "../../../assets/Lorry.avif";
import Train from "../../../assets/train.jpeg";
import Bus from "../../../assets/bus.jpeg";
import Van from "../../../assets/van.jpeg";
import Button from "../../../atomes/Button";
import { useNavigate } from "react-router-dom";
const imageMapping = {
  Car: car,
  Motorcycle: Motorcycle,
  Bicycle: Bicycle,
  Van: Van,
  Lory: Lory,
  Train: Train,
  Bus: Bus,
};

function SelectCategory() {
   const navigate = useNavigate();
  const [pagecount, setPagecount] = useState(0);
  const totalVehicles = Vehicale.Vehicale.length;
  const nextWord = () => setPagecount((prev) => (prev + 1) % totalVehicles);
  const prevWord = () =>
    setPagecount((prev) => (prev - 1 + totalVehicles) % totalVehicles);

  const currentVehicle = Vehicale.Vehicale[pagecount];
  const imagePath = imageMapping[currentVehicle?.word] || "/default.jpg";
 const navigateLetters = ()=>{
  navigate("/vocabulary/stage-two");
 }

 const navigateAlphabet = ()=>{
  navigate("/vocabulary/alohabet-learing");
 }
 
 return (
   <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center  w-full">
     <div className="py-12 px-8">
       {/* Sun & Bush Images */}
       <div className=" flex flex-row">
         <div className="h-full w-full flex flex-col items-center text-center p-4">
           {/* Alpert Sound Section */}
           <h1 className="text-4xl font-extrabold text-blue-700 mt-8">
             🏆 Alphabet Sound
           </h1>
           <p className="text-xl text-gray-700 mt-2 font-semibold">
             Let's start the adventure! 🚀
           </p>

           {/* Animated Icon */}
           <div
             className="mt-6 w-24 h-24 bg-yellow-400 flex items-center justify-center 
                  rounded-full shadow-xl animate-bounce border-4 border-white"
           >
             <span className="text-5xl text-white">✨</span>
           </div>

           {/* Start Practice Button */}
           <button
             className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-extrabold 
               py-4 px-8 rounded-full shadow-xl mt-6 hover:scale-105 active:scale-95 
               transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-yellow-300"
             onClick={navigateAlphabet}
           >
             🚀 Start Practice 🎉
           </button>
         </div>

         <div className="h-full w-full flex flex-col items-center text-center p-4">
           {/* Letter Sound Section */}
           <h1 className="text-4xl font-extrabold text-blue-700 mt-8">
             🔤 Letter Sound
           </h1>
           <p className="text-xl text-gray-700 mt-2 font-semibold">
             Let's explore letters! 🎈
           </p>

           {/* Animated Icon */}
           <div
             className="mt-6 w-24 h-24 bg-yellow-400 flex items-center justify-center 
                  rounded-full shadow-xl animate-pulse border-4 border-white"
           >
             <span className="text-5xl text-white">🔠</span>
           </div>

           {/* Start Practice Button */}
           <button
             className="bg-gradient-to-r from-purple-400 to-blue-500 text-white text-lg font-extrabold 
               py-4 px-8 rounded-full shadow-xl mt-6 hover:scale-105 active:scale-95 
               transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-blue-300"
             onClick={navigateLetters}
           >
             🎵 Start Practice 🎶
           </button>
         </div>
       </div>
       <div className=" mb-16">
         <div className="h-full w-full flex flex-col items-center text-center p-4">
           {/* Letter Sound Section */}
           <h1 className="text-4xl font-extrabold text-blue-700 mt-8">
             🔤 Sinhala Hodiya
           </h1>
           <p className="text-xl text-gray-700 mt-2 font-semibold">
             Let's explore letters! 🎈
           </p>

           {/* Animated Icon */}
           <div
             className="mt-6 w-24 h-24 bg-yellow-400 flex items-center justify-center 
                  rounded-full shadow-xl animate-pulse border-4 border-white"
           >
             <span className="text-5xl text-white">🔠</span>
           </div>

           {/* Start Practice Button */}
           <button
             className="bg-gradient-to-r from-purple-400 to-blue-500 text-white text-lg font-extrabold 
               py-4 px-8 rounded-full shadow-xl mt-6 hover:scale-105 active:scale-95 
               transition-all duration-300 border-4 border-white outline-none focus:ring-4 focus:ring-blue-300 "
             // onClick={handleClickWordPage}
           >
             🎵 Start Practice 🎶
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

export default SelectCategory;
