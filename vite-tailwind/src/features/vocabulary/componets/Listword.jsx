
import React,{useState} from 'react'
import wordimage from "../../../assets/ImageList/Apple.jpeg";
import bush from "../../../assets/bush-clipart-animated-6.png";
import sun from "../../../assets/source.gif";
function Listword() {

    const [showMessage, setShowMessage] = useState(false);

  const spechword = (textword) => {
    const word = new SpeechSynthesisUtterance(textword);

    window.speechSynthesis.speak(word);
  };



  return (
    <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center lg:h-[700px] w-full ">
      <div className=" py-10 px-11 ">
        <div className=" flex justify-between ">
          <div className=" mb-0 ">
            <div>
              <img src={sun} alt="word list" className=" h-48 max-lg:hidden" />
            </div>
            <div className=" mt-80">
              <img
                src={bush}
                alt="word list"
                className=" h-48 max-lg:hidden "
              />
            </div>
          </div>
          <div>
            <img
              src={wordimage}
              alt="word list"
              className="  lg:h-[500px]  lg:w-[700px] rounded-xl "
            />
            <div className="flex items-center justify-center   space-x-4">
              {/* Word */}
              <h1
                className="font-bold text-[90px] text-center hover:text-blue-500 active:text-red-500 transition-colors cursor-pointer"
                onMouseEnter={() => setShowMessage(true)} // Show message on hover
                onMouseLeave={() => setShowMessage(false)} // Hide message when hover ends
                onClick={() => spechword("Apple")}
              >
                Word
              </h1>

              {/* Message */}
            
            </div>
          </div>
          <div className=" mb-0 mt-[490px]">
            <img src={bush} alt="word list" className=" h-48 max-lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listword
