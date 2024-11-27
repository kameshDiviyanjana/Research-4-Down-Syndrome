import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function SideBarVoice() {
  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <div className="bg-[#1C4596] w-[200px] h-full py-6 px-4">
        <ul className="space-y-4">
          <li className="text-white text-center border-b-2 border-white py-2 hover:bg-white hover:text-[#1C4596] transition">
            <Link to={""}>Practices</Link>
          </li>

          <li className="text-white text-center border-b-2 border-white py-2 hover:bg-white hover:text-[#1C4596] transition">
            <Link to={"word"}> Word List</Link>
          </li>
          <li className="text-white text-center border-b-2 border-white py-2 hover:bg-white hover:text-[#1C4596] transition">
            Progress
          </li>
          <li className="text-white text-center border-b-2 border-white py-2 hover:bg-white hover:text-[#1C4596] transition">
            Settings
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBarVoice;
