import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserDataContext } from "../context/UserContext";
function Signup() {
  const [whoIsOpeningAcc, setWhoIs] = useState("jobSeeker");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const { setUsers, users } = useContext(UserDataContext);

  const navigate = useNavigate();
  function intiState() {
    setCompany("");
    setEmail("");
    setError("");
    setFullName("");

    setPassword("");
    setPhone("");
    setPhone("");
  }
  useEffect(() => {
    intiState();
  }, [whoIsOpeningAcc]);

  function handleSubmit(e) {
    e.preventDefault();

    const newId = uuidv4();

    if (users.map((user) => user.email).includes(email)) {
      setError("The Email already exists, try with a different Email.");
      return;
    }

    if (password.length < 8) {
      setError("The Password should be greater than 8 characters.");
      return;
    }

    const newJobSeekerAcc = {
      id: newId,
      name: fullName,
      password,
      email,
      phone,
      profilePic: "",
      role: whoIsOpeningAcc,
      experience: "",
      selfDescription: "",
      skills: [],
      resume: "",
      linkedIn: "",
      jobPreferences: "",
      appliedJobID: [],
      savedJobID: [],
    };

    const newEmployerAcc = {
      id: newId,
      name: company,
      email,
      password,
      phone,
      role: whoIsOpeningAcc,
      jobListings: [],
    };

    if (whoIsOpeningAcc === "jobSeeker") {
      setUsers((allUsers) => [...allUsers, newJobSeekerAcc]);
      navigate(`/dashboard/${newId}`);
    } else {
      setUsers((allUsers) => [...allUsers, newEmployerAcc]);
      navigate(`/dashboardEmployee/${newId}`);
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center h-screen p-5 pb-16 space-y-7  bg-gradient-to-r from-[#283E4A] to-[#52b788] relative overflow-y-scroll ">
      <div className="flex items-center justify-center space-x-2  ">
        <img src="/assets/logoIcon.png" alt="icon" className="w-[100px]" />
        <h1 className=" sm:text-[34px] font-serif uppercase text-center">
          It is just a matter of second
        </h1>
      </div>

      <div className=" sm:w-[90%] md:w-[50%] text-gray-500 shadow-2xl rounded-xl  bg-white ">
        <div className="grid grid-cols-2 justify-center text-[1.1rem] text-white sm:text-[1.4rem] font-mono   pb-2">
          <button
            onClick={() => setWhoIs("jobSeeker")}
            className={`rounded-tl-xl py-3 cursor-pointer hover:bg-gray-900 duration-300 ${
              whoIsOpeningAcc === "jobSeeker" ? "bg-gray-800" : "bg-[#0eb49b]"
            }`}
          >
            Job Seeker
          </button>
          <button
            className={`rounded-tr-xl bg-[#0eb49bc6] cursor-pointer hover:bg-gray-900 duration-300  ${
              whoIsOpeningAcc === "employer" ? "bg-gray-800" : "bg-[#0eb49b]"
            }`}
            onClick={() => setWhoIs("employer")}
          >
            Employer
          </button>
        </div>

        <form
          action="#"
          className="flex flex-col p-5 space-y-6  px-6 relative"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {whoIsOpeningAcc === "employer" ? (
            <div className="flex items-center border-b-[1px] border-gray-300 space-x-3">
              <i className="fa-solid fa-briefcase text-xl"></i>{" "}
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                type="tel"
                placeholder="Company name"
                className="placeholder:text-lg placeholder:font-mono outline-0 p-2 w-full  "
              />
            </div>
          ) : (
            <div className="flex items-center  border-b-[1px] border-gray-300 space-x-3">
              <i className="fa-solid fa-user text-xl"></i>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder=" Full Name"
                className="placeholder:text-lg placeholder:font-mono outline-0 p-2 w-full  "
              />
            </div>
          )}

          <div className="flex items-center border-b-[1px] border-gray-300 space-x-3">
            <i className="fa-solid fa-envelope text-xl  "></i>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Email Address"
              className="placeholder:text-lg placeholder:font-mono outline-0 w-full p-2 "
            />
          </div>

          <div className="flex items-center border-b-[1px] border-gray-300 space-x-3">
            <i className="fa-solid fa-phone text-xl"></i>{" "}
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="tel"
              placeholder="Phone Number"
              className="placeholder:text-lg placeholder:font-mono outline-0 p-2 w-full  "
            />
          </div>

          <div className="flex items-center border-b-[1px] border-gray-300 space-x-3">
            <i className="fa-solid fa-lock text-xl"></i>{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Password"
              className="placeholder:text-lg placeholder:font-mono outline-0 py-2"
            />
          </div>

          <button className=" py-2 text-white font-serif text-2xl  rounded-2xl bg-[#0eb49b] cursor-pointer hover:bg-[##44bfa3] hover:scale-105 duration-300">
            Signup
          </button>
          {error && (
            <div className="absolute errorAnim  top-0    px-5 rounded-sm bg-black backdrop-blur-sm flex items-center justify-center ">
              <p className="text-md font-mono text-red-700 text-center">
                {error}
              </p>
            </div>
          )}
        </form>
        <p className="text-center py-1 pb-3 ">
          already have you account?
          <Link to="/login">
            <span className="text-yellow-400 hover:underline duration-300 cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
