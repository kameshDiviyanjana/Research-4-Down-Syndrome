import React,{useEffect,useState} from 'react'
import backgroundMusic from "../../assets/ZestSound.mp3";
import Button from '../../atomes/Button';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import ConfettiEmoji from '../../utile/Flyemoji';
import chidlplay from "../../assets/park.jpg";


function Grossmotorskills() {
 const navigae = useNavigate();
    const [typedText, setTypedText] = useState("");
    const [index, setIndex] = useState(0);
    var strings = ["Grossmotor Skill"];
    var typeSpeed = 220;
    useEffect(() => {
      const interval = setInterval(() => {
        
        if (typedText === strings[index]) {
  
          if (index === strings.length - 1) {
            setIndex(0);
          } else {
            setIndex(index + 1);
          }
          setTypedText("");
        } else {
          
          setTypedText(
            (prevTypedText) =>
              prevTypedText + strings[index][prevTypedText.length]
          );
        }
      }, typeSpeed);

      // interval
      return () => clearInterval(interval);
    }, [typedText, index, strings, typeSpeed]);

    const hadleclickwordpage = ()=>{
      navigae("system");
    }
  return (
    <>
      {/* <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto">
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
        <audio autoPlay loop hidden>
          <source src={backgroundMusic}></source>
        </audio>
      </div> */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="
      bg-cover bg-no-repeat bg-center w-ful
      justify-center items-center text-center p-6"
        style={{
          backgroundImage: `url(${chidlplay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          height: "800px",
        }}
      >
        {/* Flying emoji (bird or balloon) */}
        {/* <motion.div
          initial={{ x: "-10%" }}
          animate={{ x: "110%" }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 text-5xl"
        ></motion.div> */}

        {[...Array(10)].map((_, i) => (
          <ConfettiEmoji key={i} image={"🏏"} />
        ))}

        {/* Content */}
        <div className="py-32 md:py-40 max-lg:py-48 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl lg:text-[100px] font-bold font-[Comic Sans MS,cursive] text-pink-600 drop-shadow-md"
          >
            Welcome <br /> <span className="text-yellow-400">{typedText}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12"
          >
            <Button
              styles="bg-pink-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-all"
              buttonname="🎮 Start Playing"
              Onclicks={hadleclickwordpage}
            />
          </motion.div>
        </div>

        {/* Music */}
        <audio autoPlay loop hidden>
          <source src={backgroundMusic} />
        </audio>
      </motion.div>
    </>
  );
}

export default Grossmotorskills;
