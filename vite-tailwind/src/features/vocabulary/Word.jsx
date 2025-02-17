import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import Modal from "../../atomes/Modal";
import WordAdd from "../../atomes/Form";
import WordList from "./WordList";
import backgroundMusic from "../../assets/ZestSound.mp3";

function Word() {
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
  return (
    <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto">
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
            className=" bg-white w-[200px] h-[240px] rounded-lg shadow-lg overflow-auto "
            onClick={openWordlsit}
          >
            <img
              src="data:image/jpeg;base64,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"
              className=" rounded-lg"
            />
            <h1 className=" text-center font-bold">Fruite </h1>
          </div>
          <div
            className=" bg-white w-[200px] h-[240px] rounded-lg shadow-lg overflow-auto "
            onClick={openWordlsit}
          >
            <img
              src="data:image/jpeg;base64,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"
              className=" rounded-lg"
            />
            <h1 className=" text-center font-bold">Vehicale </h1>
          </div>
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

        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div>
    </div>
  );
}

export default Word;
