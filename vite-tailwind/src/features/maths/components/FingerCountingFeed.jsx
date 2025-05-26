import React from 'react';

const FingerCountingFeed = () => {
  return (
    <div className="flex justify-center mt-[100px] mr-[70px]">
      <img 
        src="http://localhost:5002/finger_counting/feed" 
        alt="Finger counting feed" 
        className="w-full max-w-2xl rounded-2xl shadow-xl border-4 border-indigo-200 transform transition-all hover:border-indigo-400"
      />
    </div>
  );
};

export default FingerCountingFeed;
