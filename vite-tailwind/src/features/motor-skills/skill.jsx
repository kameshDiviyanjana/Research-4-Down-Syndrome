import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import bg1 from "../../../public/images/bg3.jpg";


import backgroundMusic from "../../assets/ZestSound.mp3";
import vedieogross from "../../assets/video/skiping.mp4";
import { useNavigate } from "react-router-dom";
function Grossmotorskill() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpenWordList, setIsModalOpenWordList] = useState(false);
  const openWordlsit = () => setIsModalOpenWordList(true);
  const closeWordlsit = () => setIsModalOpenWordList(false);
  const Pacticesvideo = ()=>{
    navigate("/grossmotor/system");
  }
  return (
    <div
      className="
      bg-cover bg-no-repeat bg-center w-ful
      justify-center items-center text-center p-6"
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,
        height: "900px",
      }}
    >
      <div className="ml-20 mr-20 py-10 px-11 overflow-y-auto">
        <div className="flex flex-col justify-end items-end space-y-1">
          <div>
            <h1 className="font-bold text-4xl">Score: 100</h1>
          </div>
          <div className=" flex">
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
          </div>
        </div>
        <div className=" flex flex-wrap gap-6">
          <div
            className=" bg-white w-[200px] h-[440px] rounded-lg shadow-lg overflow-auto "
            onClick={Pacticesvideo}
          >
            <video
              width="320"
              height="240"
              autoPlay
              muted
              onClick={Pacticesvideo}
            >
              <source src={vedieogross} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h1 className=" text-center font-bold">Fruite </h1>
          </div>

          <div className="flex items-center justify-center bg-white w-[200px] h-[440px] rounded-lg shadow-lg">
            <button
              className="flex items-center justify-center bg-orange-400 rounded-full w-24 h-24 text-white text-4xl font-bold shadow-md hover:bg-orange-500 active:scale-95 transition duration-200"
              onClick={openModal}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grossmotorskill;
