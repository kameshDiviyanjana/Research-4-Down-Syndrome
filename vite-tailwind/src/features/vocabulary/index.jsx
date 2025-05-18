import React,{useEffect,useState} from 'react'
import backgroundMusic from "../../assets/ZestSound.mp3";
import Button from '../../atomes/Button';
import { useNavigate } from 'react-router-dom';
import Pacticelevel from './componets/Pacticelevels'
import  classromme  from "../../assets/classromme.jpg";
function Vocabulary() {
 const navigae = useNavigate();
 const [levelview, setlevelview] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [index, setIndex] = useState(0);
    var strings = ["Vocabalary"];
    var typeSpeed = 220;
    useEffect(() => {
      const interval = setInterval(() => {
        // Check if reached the end of the current string
        if (typedText === strings[index]) {
          // Reset index if reached the end of strings array
          if (index === strings.length - 1) {
            setIndex(0);
          } else {
            setIndex(index + 1);
          }
          setTypedText("");
        } else {
          // Type next character
          setTypedText(
            (prevTypedText) =>
              prevTypedText + strings[index][prevTypedText.length]
          );
        }
      }, typeSpeed);

      // Cleanup interval
      return () => clearInterval(interval);
    }, [typedText, index, strings, typeSpeed]);

    const hadleclickwordpage = ()=>{
      // navigae("word");
      setlevelview(true)
    }
    
  return (
    <>
      <div
        className="
      bg-cover bg-no-repeat bg-center w-ful
      justify-center items-center text-center p-6"
        style={{
          backgroundImage: `url(${classromme})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          height: "800px",
        }}
      >
        {levelview ? (
          <Pacticelevel />
        ) : (
          <div className=" py-48 md:py-56 max-lg:py-60">
            <h1 className="text-7xl text-center  lg:text-[120px] font-fontstle2 h-[100px] lg:h-[250px] ">
              Welcome <br></br> {typedText}
            </h1>
            <div className=" flex justify-center">
              <Button
                styles={
                  "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14"
                }
                buttonname="Start Pactices"
                Onclicks={hadleclickwordpage}
              ></Button>
            </div>
          </div>
        )}
        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div>
    </>
  );
}

export default Vocabulary;
