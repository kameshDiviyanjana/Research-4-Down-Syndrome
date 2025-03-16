import React,{useEffect,useState} from 'react'
import backgroundMusic from "../../assets/ZestSound.mp3";
import Button from '../../atomes/Button';
import { useNavigate } from 'react-router-dom';

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
      navigae("video-grossmotor");
    }
  return (
    <>
      <div className="bg-[url(https://cdn.pixabay.com/photo/2022/06/22/11/45/background-7277773_1280.jpg)] bg-cover bg-no-repeat bg-center h-[700px] w-full overflow-y-auto">
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
      </div>
    </>
  );
}

export default Grossmotorskills;
