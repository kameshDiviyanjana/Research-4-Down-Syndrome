

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

const imageMapping = {
  Car: car,
  Motorcycle: Motorcycle,
  Bicycle: Bicycle,
  Van: Van,
  Lory: Lory,
  Train: Train,
  Bus: Bus,
};

function DefaulteLsitWord() {
  const [pagecount, setPagecount] = useState(0);
  const totalVehicles = Vehicale.Vehicale.length;

  const nextWord = () => setPagecount((prev) => (prev + 1) % totalVehicles);
  const prevWord = () =>
    setPagecount((prev) => (prev - 1 + totalVehicles) % totalVehicles);

  const currentVehicle = Vehicale.Vehicale[pagecount];
  const imagePath = imageMapping[currentVehicle?.word] || "/default.jpg";

  return (
    <div className="bg-[url('https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg')] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full">
      <div className="py-12 px-8">
        {/* Sun & Bush Images */}
        <div className="flex justify-between items-start">
          <div>
            <img src={sun} alt="sun" className="h-32 hidden lg:block" />
            <img
              src={bush}
              alt="bush"
              className="h-24 hidden lg:block mt-[450px] "
            />
          </div>

          {/* Word Display Section */}
          <div className="flex flex-col items-center  w-full  mx-auto">
            {currentVehicle && (
              <div className=" shadow-lg rounded-2xl">
                <img
                  src={imagePath}
                  alt={currentVehicle.word}
                  className="h-[400px] w-auto object-cover rounded-lg"
                />
                <h1 className="text-3xl font-bold text-center mt-4">
                  {currentVehicle.word}
                </h1>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={prevWord}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 shadow-md"
              >
                Previous
              </button>
              <button
                onClick={nextWord}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 shadow-md"
              >
                Next
              </button>
            </div>
          </div>

          {/* Bush Image */}
          <div className="mt-[570px] hidden lg:block ">
            <img src={bush} alt="bush" className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaulteLsitWord;
