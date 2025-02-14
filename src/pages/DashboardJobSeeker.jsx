import { NavLink, Outlet, useParams } from "react-router-dom";
import LeftBar from "../components/LeftBar";
import { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContext";
function DashboardJobSeeker() {
  const [showSetting, setShowSetting] = useState(false);
  const { jobSeekerId, employeeId } = useParams();
  const { users } = useContext(UserDataContext);

  const activeUser = users?.filter((user) =>
    jobSeekerId ? user.id == jobSeekerId : employeeId.id === user.id
  )[0];
  return (
    <section className="grid sm:grid-cols-[0.2fr_1fr] grid-rows-[0.1fr_1fr] bg-gray-700 h-screen ">
      <LeftBar />

      <div className="flex justify-between items-center gap-2 p-3 sm:px-10 bg-gray-900 text-white shadow-md">
        <div className="flex items-center sm:invisible">
          <img src="/assets/logoIcon.png" alt="jobIcon" className="w-[40px]" />
          <p className="text-sm xsm:text-[1rem] sm:text-lg text-yellow-400 font-bold ml-2">
            ImTech
          </p>
        </div>

        <form action="#" className=" w-[30%] xsm:w-[40%] sm:w-[50%] relative">
          <input
            type="text"
            placeholder="Search..."
            className=" w-full p-2 sm:pl-4 rounded-full bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="absolute bg-indigo-600 p-2 px-4 sm:px-5 text-md right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-indigo-500">
            <i className="fa-solid fa-search"></i>
          </button>
        </form>

        <div className="flex items-center space-x-5">
          <button className="lg:flex hidden cursor-pointer hover:text-yellow-400">
            <i className="fa-regular fa-bell text-xl"></i>
          </button>

          <button
            className="cursor-pointer"
            onClick={() => {
              setShowSetting((prev) => !prev);
            }}
          >
            {activeUser?.profilePic ? (
              <img
                src={activeUser?.profilePic}
                alt="Profile"
                className="w-[35px] h-[35px] rounded-full border-2 border-gray-700"
              />
            ) : (
              <i className="fa-regular fa-user-circle text-2xl cursor-pointer"></i>
            )}
          </button>
        </div>

        {showSetting && (
          <div className="card--animate absolute bg-white text-black px-4 py-3 right-2 top-24 sm:top-14 z-40 rounded-lg shadow-xl w-48 transition-all duration-100 transform scale-95 origin-top-right">
            <NavLink
              onClick={() => setShowSetting(false)}
              to="setting"
              className="flex gap-3 items-center p-2 rounded-md hover:bg-gray-100 transition"
            >
              <i className="fa-solid fa-gear text-gray-600 text-lg"></i>
              <p className="text-gray-700 font-medium">Settings</p>
            </NavLink>

            <NavLink
              to="/"
              onClick={() => setShowSetting(false)}
              className="flex gap-3 items-center p-2 rounded-md hover:bg-red-100 transition"
            >
              <i className="fa-solid fa-power-off text-red-500 text-lg"></i>
              <p className="text-red-500 font-medium">Logout</p>
            </NavLink>
          </div>
        )}
      </div>

      <Outlet />
    </section>
  );
}

export default DashboardJobSeeker;
