

import React, { useState } from "react";
import Modal from "../../../atomes/Modal";
import WordAdd from "../../../atomes/Form";
import backgroundMusic from "../../../assets/ZestSound.mp3";
import { AllAddWord } from "../../../Api/vocabularyApi";
import { useNavigate } from "react-router-dom";
import { findscore } from "../../../Api/scoreApi";
function StageTwo() {
  const navigate = useNavigate();
  const [pagecount, setPagecount] = useState(1);
  const userme = localStorage.getItem("userid");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const { data: scoretaken } = findscore(userme);

  const passid = (id) => {
    navigate("/vocabulary/word-learn/" + id);
  };

  const navigateAllList = () => {
    navigate("/vocabulary/list-all", { state: { isActive: true } });
    
  };

  const marks = scoretaken?.data?.marks;

  
  let starCount = 0;
  if (marks >= 75) {
    starCount = 4;
  } else if (marks >= 50) {
    starCount = 3;
  }

  
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
       
        <div className="flex flex-col justify-end items-center space-y-4">
          
          <div>
            <h1 className="font-extrabold text-5xl text-[#F18F02] animate-pulse">
              Score: {scoretaken?.data?.marks}
            </h1>
          </div>

          
          <div className="flex space-x-2">{stars}</div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          
          <div className="bg-white w-52 h-60 rounded-xl shadow-lg flex flex-col items-center justify-center p-4 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Start List
            </h2>
            <button
              className="flex items-center justify-center bg-orange-500 w-28 h-28 text-white text-3xl font-bold rounded-full shadow-md hover:bg-orange-600 active:scale-95 transition duration-200"
              onClick={navigateAllList}
            >
              🚀
            </button>
          </div>

         
          {getallword?.data?.wordses?.map((word) => (
            <div
              key={word._id}
              className="flex items-center justify-center bg-white w-[200px] h-[240px] rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div
                className="text-center space-y-4"
                onClick={() => passid(word._id)}
              >
                <img
                  src={word.imagewordUrl}
                  alt={word.wordAdd}
                  className="h-[180px] rounded-lg"
                />
                <h1 className="text-center font-bold text-xl">
                  {word.wordAdd}
                </h1>
              </div>
            </div>
          ))}

          
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
       

        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div>
    </div>
  );
}

export default StageTwo;
