import {useState} from 'react'
import Modal from '../../molecule/moble';
import WordAdd from './wordAdd';

function VoicesWord() {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className=" lg:flex  justify-between mb-5 ">
        <div>
          <h1 className=" text-4xl font-bold">Word List</h1>
        </div>
        <div>
          <button className=" py-3 px-4 bg-orange-400" onClick={openModal}>
            {" "}
            Add Word
          </button>
          <Modal open={isModalOpen} onClose={closeModal}>
            <WordAdd />
          </Modal>
        </div>
      </div>
      <div>
        <div className=" flex flex-wrap  gap-3">
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
          <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
              alt="image"
            />
            <h1 className="font-bold">Apple</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoicesWord
