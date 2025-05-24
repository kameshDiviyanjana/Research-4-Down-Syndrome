import React,{useEffect,useState} from 'react'
import backgroundMusic from "../../assets/ZestSound.mp3";
import Button from '../../atomes/Button';
import { useNavigate } from 'react-router-dom';
import Pacticelevel from './componets/Pacticelevels'
import { motion } from "framer-motion";
//import  classromme  from "../../assets/classromme.jpg";
import classromme from "../../assets/newpicture.jpg";

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
      <motion.div
        className="
        bg-cover bg-no-repeat bg-center w-full
        flex justify-center items-center text-center p-6"
        style={{
          backgroundImage: `url(${classromme})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          height: "800px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {levelview ? (
          <Pacticelevel />
        ) : (
          <div className="py-48 md:py-56 max-lg:py-60">
            {/* Heading */}
            {/* <motion.h1
              className="text-5xl md:text-7xl lg:text-[120px] font-fontstle2 h-[100px] lg:h-[250px]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Welcome
              <br />
              
              <motion.span
                className="inline-block whitespace-nowrap overflow-hidden border-r-4 border-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {typedText}
              </motion.span>
            </motion.h1> */}
            <motion.h1
              className="
     text-9xl md:text-6xl lg:text-[80px]
    font-[Fredoka_One,cursive]
      text-pink-500
     font-fontstle2 
    drop-shadow-lg
    relative
    h-[120px] lg:h-[200px]
  "
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block mr-2 animate-bounce   ">🎈</span>
              <span className=" text-9xl">Welcome</span>
              <br />
              <motion.span
                className="
      inline-block 
      whitespace-nowrap 
      overflow-hidden 
      border-r-4 border-pink-500 
      pr-1   text-9xl 
    "
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                {typedText}
              </motion.span>
              {/* Floating Balloon Emoji */}
              <motion.span
                className="absolute top-0 right-0 text-3xl"
                initial={{ y: -20, x: 20, opacity: 0 }}
                animate={{ y: [-20, 0, -20], opacity: [0, 1, 0] }}
                transition={{ delay: 1.8, duration: 2, repeat: Infinity }}
              >
                🎈
              </motion.span>
            </motion.h1>

            {/* Button */}
            <motion.div
              className="flex justify-center mt-14"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <Button
                styles="
    bg-pink-400 
    hover:bg-pink-500 
    text-white 
    font-extrabold 
    text-lg 
    py-3 
    px-8 
    rounded-full 
    shadow-2xl 
    transition 
    duration-300 
    transform 
    hover:scale-105
  "
                buttonname="🎮 Let’s Play & Learn!"
                Onclicks={hadleclickwordpage}
              />

              {/* <Button
                styles="
                bg-[#F18F02] font-bold py-2 rounded-md 
                hover:bg-blue-900 hover:text-white transition duration-300 
                text-white px-5
              "
                buttonname="Start Practices"
                Onclicks={hadleclickwordpage}
              /> */}
            </motion.div>
          </div>
        )}
        <audio autoPlay loop hidden>
          <source src={backgroundMusic} />
        </audio>
      </motion.div>
      {/* <div
        className="
    bg-cover bg-no-repeat bg-center w-full
    flex justify-center items-center text-center p-6"
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
          <div className="py-48 md:py-56 max-lg:py-60">
            <h1
              className="
          text-5xl md:text-7xl lg:text-[120px] font-fontstle2 
          h-[100px] lg:h-[250px] animate-fadeInUp
        "
            >
              Welcome <br />
              <span className="animate-typing whitespace-nowrap overflow-hidden border-r-4 border-white">
                {typedText}
              </span>
            </h1>
            <div className="flex justify-center animate-fadeIn delay-500">
              <Button
                styles="
            bg-[#F18F02] font-bold py-2 rounded-md 
            hover:bg-blue-900 hover:text-white transition duration-300 
            text-white px-5 mt-14
          "
                buttonname="Start Practices"
                Onclicks={hadleclickwordpage}
              />
            </div>
          </div>
        )}
        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div> */}

      {/* <div
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
      </div> */}
    </>
  );
}

export default Vocabulary;
