import React,{useState} from "react";
import Button from "../../atomes/Button";
import WordLists from "../../utile/WordList.json";
import appleImage from "../../assets/ImageList/Apple.jpeg"; // Correct path
import bananaImage from "../../assets/ImageList/Banan.jpeg"; // Correct path
import mangoImage from "../../assets/ImageList/mango.jpeg";
import pineappleImage from "../../assets/ImageList/pineapple.jpeg";
import orangeImage from "../../assets/ImageList/orange.jpeg";
import grapeImage from "../../assets/ImageList/grapse.jpeg";
import cherryImage from "../../assets/ImageList/chery.jpeg";
import passionImage from "../../assets/ImageList/Passion.jpeg";
import { useNavigate } from "react-router-dom";


const imageMapping = {
  Apple: appleImage,
  Banana: bananaImage,
  Mango: mangoImage,
  Pineapple: pineappleImage,
  Orange: orangeImage,
  Grape: grapeImage,
  Cherry: cherryImage,
  Passion: passionImage,
};

const WordList = () => {
 const navigate = useNavigate();
  const PacticesWord =()=>{
    console.log("click");
  navigate("/vocabulary/list-word");
  }
  return (
    <div className="h-[600px] w-[900px] bg-white">
      <div>
        <h1 className=" text-center font-bold text-3xl">Word List</h1>
      </div>
      <div className="ml-12 mr-12 overflow-y-auto h-[450px]">
        {WordLists.word.map((word) => {
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

export default WordList;



