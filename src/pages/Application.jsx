import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function Application() {
  const { jobSeekerId } = useParams();
  const { users, setUsers } = useContext(UserDataContext);

  const activeUser = users.filter((user) => user.id == jobSeekerId)[0];

  const [fullName, setFullName] = useState(activeUser.name);

  const [profile, setProfile] = useState(activeUser.profilePic);

  const [experience, setExperience] = useState(activeUser.experience);

  const [skill, setSkill] = useState(String(activeUser.skills));

  const [aboutMe, setAboutMe] = useState(activeUser.selfDescription);

  const [resume, setResume] = useState(activeUser.resume);

  const [linkedIn, setLinkedIn] = useState("");

  function handleProfile(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handelSaveAndSubmit(e) {
    e.preventDefault();

    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === jobSeekerId
          ? {
              ...user,
              name: fullName,
              profilePic: profile,
              resume: resume,
              skills: skill,
              experience: experience,
              selfDescription: aboutMe,
              linkedIn,
            }
          : user
      )
    );
    alert("Successfully Updated");
  }

  return (
    <form
      onSubmit={(e) => handelSaveAndSubmit(e)}
      className="p-8 pb-20 sm:pb-8 w-full  mx-auto text-gray-900 bg-gray-800 shadow-lg space-y-6 font-sans overflow-y-scroll"
    >
      <h2 className="text-3xl font-extrabold text-center text-white">
        Complete Your Profile
      </h2>

      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="profile-upload"
          className="text-lg font-semibold text-white mb-2"
        >
          Profile Picture
        </label>
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-600">
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleProfile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <img
            src={profile}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold text-white mb-2">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            type="text"
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-white mb-2">
            Experience
          </label>
          <input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            type="text"
            placeholder="Enter your experience"
            className="w-full p-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-white mb-2">Skills</label>
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            type="text"
            placeholder="List your skills (comma separated)"
            className="w-full p-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-white mb-2">
            About Me
          </label>
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="Tell us about yourself"
            className="w-full min-h-[200px] p-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
          ></textarea>
        </div>
        {/* LinkedIN and Resume */}

        <div>
          <label className="block font-semibold text-white mb-2">
            Upload Resume
          </label>

          <input
            onChange={(e) => setResume(e.target.files[0])}
            required={!resume}
            type="file"
            className="mt-2 w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-lg p-3 cursor-pointer file:cursor-pointer file:bg-indigo-600 file:text-white file:px-4 file:py-2 file:rounded-md hover:file:bg-indigo-500 transition duration-200 ease-in-out"
          />
          {resume && <p className="text-white">{resume.name}</p>}
        </div>

        <div>
          <label className="block font-semibold text-white mb-2">
            LinkedIn
          </label>

          <input
            onChange={(e) => setLinkedIn(e.target.value)}
            type="text"
            placeholder="Enter your linked in Account"
            className="mt-2 w-full border border-gray-600 bg-gray-700 text-gray-300 rounded-lg p-3 cursor-pointer file:cursor-pointer  transition duration-200 ease-in-out"
          />
        </div>
      </div>

      <button className="w-full bg-indigo-600 hover:bg-indigo-500 transition duration-200 p-3 rounded-lg text-white font-semibold">
        Save & Update Profile
      </button>
    </form>
  );
}

export default Application;
