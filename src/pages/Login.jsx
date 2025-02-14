import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { users } = useContext(UserDataContext);
  const navigate = useNavigate();

  function handelLogin(e) {
    e.preventDefault();

    const activeUser = users.filter(
      (user) => user.email === email && user.password === password
    )[0];

    if (activeUser)
      activeUser.role === "Job Seeker"
        ? navigate(`/dashboard/${activeUser.id}`)
        : navigate(`/dashboardEmployee/${activeUser.id}`);
    else setError(true);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden h-[70%] w-[90%] max-w-4xl">
        {/* Left Section */}
        <div className="flex flex-col justify-center p-8 space-y-6 relative">
          {error && (
            <div className="absolute errorAnim  top-0    px-5 rounded-sm bg-black backdrop-blur-sm flex items-center justify-center ">
              <p className="text-md font-mono text-red-700 text-center">
                The email and / or the password is incorrect
              </p>
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600">Login to access your account</p>
          <form onSubmit={(e) => handelLogin(e)} className="space-y-5">
            {/* Email Input */}
            <div className="flex items-center border-b border-gray-300 pb-2 space-x-3">
              <i className="fa-solid fa-envelope text-lg text-gray-500"></i>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Email Address"
                className="w-full outline-none text-md font-mono placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border-b border-gray-300 pb-2 space-x-3">
              <i className="fa-solid fa-lock text-lg text-gray-500"></i>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                className="w-full outline-none text-md font-mono placeholder-gray-400"
              />
            </div>

            <button className="w-full py-3 bg-[#0eb49b] text-white text-lg font-medium rounded-lg hover:bg-[#44bfa3] hover:scale-105 transition-transform duration-300">
              Login
            </button>
          </form>
          <div className="flex justify-between flex-col xsm:flex-row">
            <Link to="/signup">
              <p className="text-gray-500 text-[0.8rem] sm:text-sm">
                Don’t have an account?{" "}
                <span className="text-[#0eb49b] hover:underline">Sign Up</span>
              </p>
            </Link>
            <p className="text-[0.8rem] sm:text-sm hover:underline cursor-pointer duration-200 text-yellow-800">
              Forgot your password?
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src="/assets/TechLogo.png"
            alt="logo"
            className="w-full h-full object-fill"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
