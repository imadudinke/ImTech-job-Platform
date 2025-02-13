import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function LeftBar({ who = "" }) {
  return (
    <div className="z-40 shadow-lg fixed bottom-0 right-0 sm:h-full left-0 grid sm:grid-rows-[0.1fr_1fr] bg-gray-900 sm:bg-gray-800 sm:relative row-span-2">
      {/* Logo Section */}
      <div className="hidden sm:flex justify-center items-center py-4">
        <img src="/assets/logoIcon.png" alt="jobIcon" className="w-14 h-14" />
        <p className="text-3xl text-yellow-400 font-bold ml-2">ImTech</p>
      </div>

      {/* Navigation Links */}
      <div className="text-white flex sm:flex-col px-3 gap-5 sm:justify-between mt-2 sm:px-2">
        {!who ? (
          // JobSeeker Navigation
          <div className="flex sm:flex-col justify-between w-full sm:space-y-6 py-2 sm:py-10">
            {/* Home */}
            <NavLink
              to="home"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-home text-xl"></i>
              <span className="text-sm sm:text-lg">Home</span>
            </NavLink>

            {/* Jobs */}
            <NavLink
              to="job"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-briefcase text-xl"></i>
              <span className="text-sm sm:text-lg">Applied Jobs</span>
            </NavLink>

            {/* Saved Jobs */}
            <NavLink
              to="saved"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-bookmark text-xl"></i>
              <span className="text-sm sm:text-lg">Saved Jobs</span>
            </NavLink>

            {/* Applications */}
            <NavLink
              to="application"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-file-signature text-xl"></i>
              <span className="text-sm sm:text-lg">Applications</span>
            </NavLink>
          </div>
        ) : (
          // Employee Navigation
          <div className="flex sm:flex-col justify-between w-full sm:space-y-6 py-2 sm:py-10">
            {/* Post Jobs */}
            <NavLink
              to="postJobs"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-pen-to-square text-xl"></i>
              <span className="text-sm sm:text-lg">Post Jobs</span>
            </NavLink>

            {/* Posted Jobs */}
            <NavLink
              to="postedJobs"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-list-check text-xl"></i>
              <span className="text-sm sm:text-lg">Posted Jobs</span>
            </NavLink>

            {/* Applicants */}
            <NavLink
              to="applicants"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-user-group text-xl"></i>
              <span className="text-sm sm:text-lg">Applicants</span>
            </NavLink>

            {/* Settings */}
            <NavLink
              to="setting"
              className="flex items-center gap-3 hover:bg-cyan-800 p-2 rounded-lg duration-300"
            >
              <i className="fa-solid fa-gear text-xl"></i>
              <span className="text-sm sm:text-lg">Settings</span>
            </NavLink>
          </div>
        )}

        {/* Logout Button */}
        <div className="py-2 hidden sm:flex sm:border-t-2">
          <NavLink
            to="/"
            className="flex items-center gap-3 p-2 rounded-lg duration-300 hover:bg-red-600"
          >
            <i className="fa-solid fa-right-from-bracket text-xl"></i>
            <span className="text-sm sm:text-lg">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

LeftBar.propTypes = {
  who: PropTypes.string,
};

export default LeftBar;
