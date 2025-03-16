import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import Modal from "../../atomes/Modal";
import WordAdd from "../../atomes/Form";
import WordList from "./WordList";
import backgroundMusic from "../../assets/ZestSound.mp3";
import fruite from "../../assets/ruteites.jpeg";
import vehical from "../../assets/car.jpeg";
import VehicalList from "./VehicaleList";
import { AllAddWord } from "../../Api/vocabularyApi";
import { useNavigate } from "react-router-dom";
import { findscore } from "../../Api/scoreApi";
function Word() {
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
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
  const [isModalOpenVehicleList, setIsModalOpenVehiclList] = useState(false);
  const opeenVehiclelsit = () => setIsModalOpenVehiclList(true);
  const closeVehiclelsit = () => setIsModalOpenVehiclList(false);
  const {
    data: getallword,
    isLoading,
    error,
  } = AllAddWord(pagecount, 100, userme);
  const { data:scoretaken}=findscore(userme);
  const navigate = useNavigate();

  const passid = (id) => {
    navigate("/vocabulary/word-learn/" + id);
  };

  const marks = scoretaken?.data?.marks;

  // Determine the number of stars based on marks
  let starCount = 0;
  if (marks >= 75) {
    starCount = 4;
  } else if (marks >= 50) {
    starCount = 3;
  }

  // Create an array of stars based on the star count
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`mr-2 text-yellow-500 text-4xl ${
        index < starCount ? "★" : "☆"
      }`}
    >
      {index < starCount ? "★" : "☆"}
    </span>
  ));

  return (
    <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto">
      <div className="ml-20 mr-20 py-10 px-11 overflow-y-auto">
        <div className="flex flex-col justify-end items-end space-y-1">
          <div>
            <h1 className="font-bold text-4xl">
              Score:{scoretaken?.data?.marks}{" "}
            </h1>
          </div>
          <div className="flex">{stars}</div>
          {/* <div className=" flex">
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
            <span className="mr-2 text-yellow-500 text-4xl">★</span>
          </div> */}
        </div>
        <div className=" flex flex-wrap gap-6">
          <div
            className=" bg-white w-[200px] h-[240px] rounded-lg shadow-lg overflow-auto "
            onClick={openWordlsit}
          >
            <img
              src={fruite}
              alt="a sunrise over a mountain range"
              className=" rounded-lg h-[200px] "
            />
            <h1 className=" text-center font-bold">Fruite </h1>
          </div>
          <div
            className=" bg-white w-[200px] h-[240px] rounded-lg shadow-lg overflow-auto "
            onClick={opeenVehiclelsit}
          >
            <img src={vehical} alt="car" className="  h-[190px] rounded-lg" />
            <h1 className=" text-center font-bold mt-2">Vehicale </h1>
          </div>
{/* 
          {getallword?.data?.wordses?.map((word) => (
            <div className="flex items-center justify-center bg-white w-[200px] h-[240px] rounded-lg shadow-lg">
              <div
                key={word._id}
                className="text-center space-y-4"
                onClick={() => {
                  passid(word._id);
                }}
              >
                <img
                  src={word.imagewordUrl}
                  alt={word.wordAdd}
                  className=" h-[180px]"
                />
                <h1 className="text-center font-bold">{word.wordAdd}</h1>
              </div>
            </div>
          ))} */}

          <div className="flex items-center justify-center bg-white w-[200px] h-[240px] rounded-lg shadow-lg">
            <button
              className="flex items-center justify-center bg-orange-400 rounded-full w-24 h-24 text-white text-4xl font-bold shadow-md hover:bg-orange-500 active:scale-95 transition duration-200"
              onClick={openModal}
            >
              +
            </button>
          </div>
        </div>
        <Modal open={isModalOpen} onClose={closeModal}>
          <WordAdd />
        </Modal>

        <Modal open={isModalOpenWordList} onClose={closeWordlsit}>
          <div className=" flex justify-center">
            <WordList />
          </div>
        </Modal>
        <Modal open={isModalOpenVehicleList} onClose={closeVehiclelsit}>
          <div className=" flex justify-center">
            <VehicalList />
          </div>
        </Modal>

        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div>
    </div>
  );
}

export default Word;
