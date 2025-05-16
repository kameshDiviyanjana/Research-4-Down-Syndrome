import React from "react";
import Button from "../../atomes/Button";
import Vehicale from "../../utile/Vehicale.json";
import car from "../../assets/car55.jpeg"; // Correct path
import Motorcycle from "../../assets/bike.jpeg"; // Correct path
import Bicycle from "../../assets/bicycle.jpeg";
import Lory from "../../assets/Lorry.avif";
import Train from "../../assets/train.jpeg";
import Bus from "../../assets/bus.jpeg";
import Van from "../../assets/van.jpeg";
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

const VehicalList = () => {
   const navigate = useNavigate();
   const PacticesWord = () => {
     console.log("click");
     navigate("/vocabulary/list-car");
   };
  return (
    <div className="h-[600px] w-[900px] bg-white">
      <div>
        <h1 className=" text-center font-bold text-3xl">Word List</h1>
      </div>
      <div className="ml-12 mr-12 overflow-y-auto h-[450px]">
        {Vehicale.Vehicale.map((word) => {
          const imagePath = imageMapping[word.word];
          const fallbackImage = "/path/to/default-image.jpg"; // Change this to an actual path if needed
          const finalImagePath = imagePath || fallbackImage;

          return (
            <div
              className="shadow-inner rounded-3xl p-4 grid lg:grid-cols-2 gap-4"
              key={word.id}
            >
              <div>
                <img
                  src={finalImagePath}
                  alt={word.word}
                  className="h-[100px] rounded-lg"
                />
              </div>
              <div>
                <h1>{word.word}</h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button
          styles="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14"
          buttonname="Let's Start"
          Onclicks={PacticesWord}
        />
      </div>
    </div>
  );
};

export default VehicalList;
