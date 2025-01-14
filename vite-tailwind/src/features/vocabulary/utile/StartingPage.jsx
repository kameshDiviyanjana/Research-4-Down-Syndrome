import React from 'react'
import child from '../../../assets/child.png'
function StartingPage(props) {
  return (
    <div>
      <div>
        <button
          onClick={props.setstart}
          className='"bg-[#F18F02] bg-orange-500 font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 text-white px-5 mt-14 '
        >
          Click
        </button>
        <div className=" mt-4">
          <h1 className=" font-bold text-3xl"> Welcome To Word Pactise</h1>
        </div>
        <div>
          <img src={child} alt="image" />
        </div>
      </div>
    </div>
  );
}

export default StartingPage
