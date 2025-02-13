import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import LeftBar from "../components/LeftBar";

function DashboardEmployee() {
  const [showSetting, setShowSetting] = useState(false);
  return (
    <div>
      <section className="grid sm:grid-cols-[0.2fr_1fr] grid-rows-[0.1fr_1fr] bg-gray-700 h-screen ">
        {/* left bar  */}
        <LeftBar who="employee" />
        {/* header and top bar */}
        <div className="flex justify-between items-center gap-1 p-2 sm:px-10 bg-gray-900 text-white">
          <div className="flex justify-evenly px-2 items-center visible sm:invisible">
            <img
              src="/assets/logoIcon.png"
              alt="jobIcon"
              className="max-w-[50px]"
            />
            <p className="text-lg sm:text-3xl text-yellow-400 font-bold">
              ImTech
            </p>
          </div>
          <form action="#" className="w-[50%] sm:w-[60%] relative">
            <input
              type="text"
              className="w-full  p-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="absolute bg-indigo-600 p-1 px-3 sm:px-5 text-md sm:text-lg right-[0.5%] top-[7%] bottom-[7%]  rounded-full">
              Search
            </button>
          </form>
          <div className="flex items-center space-x-4">
            <i className="fa-regular fa-bell text-2xl"></i>
            <i
              onClick={() => {
                setShowSetting((perSetting) => !perSetting);
              }}
              className="fa-regular text-2xl fa-user-circle cursor-pointer"
            ></i>
          </div>
          {showSetting && (
            <div className="card--animate bg-white absolute text-black px-6 py-4 right-2 top-[12%] z-40 rounded-lg shadow-xl w-48 transition-all duration-200 transform scale-95 origin-top-right">
              <NavLink
                onClick={() => setShowSetting(false)}
                to="setting"
                className="flex gap-3 items-center w-full p-3 rounded-md hover:bg-gray-100 transition"
              >
                <i className="fa-solid fa-gear text-gray-600 text-lg"></i>
                <p className="text-gray-700 font-medium">Settings</p>
              </NavLink>

              <NavLink
                to="/"
                onClick={() => setShowSetting(false)}
                className="flex gap-3 items-center w-full p-3 rounded-md hover:bg-red-100 transition"
              >
                <i className="fa-solid fa-power-off text-red-500 text-lg"></i>
                <p className="text-red-500 font-medium">Logout</p>
              </NavLink>
            </div>
          )}
        </div>

        <Outlet />
      </section>
    </div>
  );
}

export default DashboardEmployee;
