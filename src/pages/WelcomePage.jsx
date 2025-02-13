import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function WelcomePage() {
  const navigate = useNavigate();
  const { jobSeekerId } = useParams();
  const { setUsers } = useContext(UserDataContext);
  const [resume, setResume] = useState("");
  const [jobPreferences, setJobPreferences] = useState();

  function handelSubmit(e) {
    e.preventDefault();
    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === jobSeekerId
          ? {
              ...user,
              resume,
              jobPreferences,
            }
          : user
      )
    );
    navigate("home");
  }

  return (
    <section className="bg-gray-900 text-white overflow-y-scroll p-5 pb-20 sm:pb-5 py-7 flex flex-col justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-4">
          🎉 Welcome!
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Thank you for your interest in our company. <br />
          Please fill out the form below.
        </p>
        <form
          action="#"
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            handelSubmit(e);
          }}
        >
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Upload Your Resume
            </label>
            <input
              onChange={(e) => setResume(e.target.files[0])}
              required={!resume}
              type="file"
              className="mt-2 w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-lg p-3 cursor-pointer file:cursor-pointer file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-md hover:file:bg-indigo-500 transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Job Preferences
            </label>
            <input
              required
              type="text"
              value={jobPreferences}
              onChange={(e) => setJobPreferences(e.target.value)}
              placeholder="Enter your preferred role..."
              className="mt-2 w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none transition duration-150 ease-in-out"
              aria-label="Job Preferences"
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}

export default WelcomePage;
