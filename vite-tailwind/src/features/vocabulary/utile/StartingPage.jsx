import React from 'react'
import child from '../../../assets/child.png'
function StartingPage(props) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={props.setstart}
          className="bg-orange-500 font-bold py-4 px-8 rounded-full text-white hover:bg-yellow-600 transition duration-300 transform hover:scale-105 mt-14"
        >
          Let's Play!
        </button>
        <div className="mt-6">
          <h1 className="font-bold text-4xl text-center text-[#F18F02]">
            Welcome to Word Practice!
          </h1>
        </div>
        <div>
          <img src={child} alt="image" />
        </div>
      </div>
    </div>
  );
}

export default StartingPage
