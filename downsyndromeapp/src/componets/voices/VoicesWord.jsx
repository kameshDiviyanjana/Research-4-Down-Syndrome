// import {useState} from 'react'
// import Modal from '../../molecule/moble';
// import WordAdd from './wordAdd';
// import AllAddWord from '../../api/wordApi'
// function VoicesWord() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);
//    const {data:getallword} = AllAddWord()
//   return (
//     <div>
//       <div className=" lg:flex  justify-between mb-5 ">
//         <div>
//           <h1 className=" text-4xl font-bold">Word List</h1>
//         </div>
//         <div>
//           <button className=" py-3 px-4 bg-orange-400" onClick={openModal}>
//             {" "}
//             Add Word
//           </button>
//           <Modal open={isModalOpen} onClose={closeModal}>
//             <WordAdd />
//           </Modal>
//         </div>
//       </div>
//       <div>
//         <div className=" flex flex-wrap  gap-3">
//           {/* {getallword.wordses.map(() => (
//             <>
//               <div className=" bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr4Fo2rTO4AovAp8Qpz4bg9p_UkHTmEkNXIQ&s"
//                   alt="image"
//                 />
//                 <h1 className="font-bold">Apple</h1>
//               </div>
//             </>
//           ))} */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VoicesWord

// import { useState } from "react";
// import Modal from "../../molecule/moble";
// import WordAdd from "./wordAdd";
// import AllAddWord from "../../api/wordApi";

// function VoicesWord() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Call the custom hook to fetch data
//   const { data: getallword, isLoading, error } = AllAddWord();
//  console.log("tesr : ", getallword?.data.wordses?.wordAdd);
//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>; // Show error state
//   }

//   return (
//     <div>
//       <div className="lg:flex justify-between mb-5">
//         <div>
//           <h1 className="text-4xl font-bold">Word List</h1>
//         </div>
//         <div>
//           <button className="py-3 px-4 bg-orange-400" onClick={openModal}>
//             Add Word
//           </button>
//           <Modal open={isModalOpen} onClose={closeModal}>
//             <WordAdd />
//           </Modal>
//         </div>
//       </div>
//       <div>
//         <div className="flex flex-wrap gap-3">
//           {isLoading &&
//             getallword?..wordses.map((word) => (
//               <div
//                 key={word._id}
//                 className="bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center"
//               >
//                 <img
//                   src={word.imagewordUrl || "https://via.placeholder.com/150"}
//                   alt={word.wordAdd || "Word Image"}
//                   className="w-full h-[100px] object-cover"
//                 />
//                 <h1 className="font-bold">{word.wordAdd || "Unnamed Word"}</h1>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VoicesWord;
import { useState } from "react";
import Modal from "../../molecule/moble";
import WordAdd from "./wordAdd";
import AllAddWord from "../../api/findAllword";

function VoicesWord() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const userme = localStorage.getItem("userid");
  // Call the custom hook to fetch data
  const { data: getallword, isLoading, error } = AllAddWord(1,20,userme);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>; // Show error state
  }

  return (
    <div>
      <div className="lg:flex justify-between mb-5">
        <div>
          <h1 className="text-4xl font-bold">Word List</h1>
        </div>
        <div>
          <button className="py-3 px-4 bg-orange-400" onClick={openModal}>
            Add Word
          </button>
          <Modal open={isModalOpen} onClose={closeModal}>
            <WordAdd />
          </Modal>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-3">
          {getallword?.data?.wordses.map((word) => (
            <div
              key={word._id}
              className="bg-white shadow-2xl w-[200px] h-[200px] py-5 px-5 text-center"
            >
              <img
                src={word.imagewordUrl || "https://via.placeholder.com/150"}
                alt={word.wordAdd || "Word Image"}
                className="w-full h-[100px] object-cover"
              />
              <h1 className="font-bold">{word.wordAdd || "Unnamed Word"}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoicesWord;

