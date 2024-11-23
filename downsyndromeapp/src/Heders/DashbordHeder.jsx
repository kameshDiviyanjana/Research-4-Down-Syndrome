import { useState, useContext } from "react";
import { AuthContext } from "../componets/AuthProvider";


function DashbordHeder() {
     const [enable, setEnable] = useState(true);
       const { setAuthState } = useContext(AuthContext);

     const prifilename = localStorage.getItem("user");

     function menyclick() {
       setEnable(!enable);
     }
     const handleLogout = () => {
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       setAuthState(null);
       window.location.href = "/";
       
     };
  return (
    <div>
      <div>
        <div className="w-full bg-[#1C4596]">
          <div className="lg:ml-14 lg:mr-14 lg:grid lg:grid-cols-2 gap-3 bg-[#1C4596] max-lg:grid max-lg:grid-cols-2">
            {/* Title Section */}
            <div className=" bg-[#1C4596]">
              <h4 className="text-3xl font-bold">
                Down<span className="text-4xl text-red-400">syndrome </span>
                <span className="font-thin text-5xl">e</span>
              </h4>
            </div>

            {/* Menu Toggle (Visible on Small Screens) */}
            <div className="hidden max-md:block">
              <div className="flex justify-end py-1 px-2">
                {enable ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-white flex justify-end mt-7"
                    onClick={menyclick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-white flex justify-end mt-7"
                    onClick={menyclick}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Profile and Logout Section */}
            <div className="flex items-center justify-end gap-5  mt-4 bg-[#1C4596] max-lg:hidden px-4 py-2">
              <h1 className="text-white text-lg font-medium">{prifilename}</h1>
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="px-6 py-1 bg-[#F18F02] text-white font-semibold rounded-lg hover:bg-[#d77e02] focus:ring-2 focus:ring-offset-2 focus:ring-[#F18F02]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbordHeder
