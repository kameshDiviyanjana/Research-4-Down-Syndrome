import { useState } from "react";
import Modal from "../../molecule/moble";
import WordAdd from "./wordAdd";
import AllAddWord from "../../api/findAllword";
import DleteWord from "../../api/DeleteWord";
import { useDispatch } from "react-redux";
import { setId } from "../../redux/idSlice";
import { useNavigate } from "react-router-dom";
function VoicesWord() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const userme = localStorage.getItem("userid");
  const dispatch = useDispatch();

  // Call the custom hook to fetch data
  const { data: getallword, isLoading, error } = AllAddWord(1, 20, userme);

  // Use the mutation hook for deleting words here, outside of any conditional render
  const deleteWordMutation = DleteWord(); // This should be called unconditionally

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>; // Show error state
  }

  const handleSelectWord = (wordId) => {
    setSelectedWords(
      (prevSelected) =>
        prevSelected.includes(wordId)
          ? prevSelected.filter((id) => id !== wordId) // Deselect
          : [...prevSelected, wordId] // Select
    );
  };
console.log(selectedWords);
  // Handle the delete action
  const handleDeleteWords = async () => {
    if (selectedWords.length === 0) {
      alert("Please select words to delete.");
      return;
    }

    // Call the mutation to delete selected words
    deleteWordMutation.mutate(selectedWords);
  };
  const idpass = (number)=>{
  dispatch(setId(number));
  navigate("/voice");
  }

  return (
    <div>
      <div className="lg:flex justify-between mb-5">
        <div>
          <h1 className="text-4xl font-bold">Word List</h1>
        </div>
        <div className=" gap-6">
          <button className="py-3 px-4 bg-orange-400" onClick={openModal}>
            Add Word
          </button>
          <button className="py-3 px-4  bg-red-500" onClick={handleDeleteWords}>
            Delete All Selected
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
              onClick={() => {
                idpass(word._id);
              }}
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




