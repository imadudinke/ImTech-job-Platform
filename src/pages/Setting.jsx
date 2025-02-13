import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function Setting() {
  const { jobSeekerId, employeeId } = useParams();
  const { users, setUsers } = useContext(UserDataContext);
  const activeUser = users.filter((user) =>
    jobSeekerId ? user.id == jobSeekerId : employeeId === user.id
  )[0];
  const [password, setPassword] = useState(activeUser?.password || "");
  const [email, setEmail] = useState(activeUser?.email);
  const [company, setCompany] = useState(activeUser?.name || "");
  const [showPassword, setShowPassword] = useState(false);
  function handelSaveAndSubmit(e) {
    e.preventDefault();

    setUsers((allUsers) =>
      allUsers.map((user) =>
        user.id === activeUser.id
          ? {
              ...user,
              email: email,
              password: password,
            }
          : user
      )
    );
    alert("Successfully Saved");
  }
  return (
    <form
      onSubmit={(e) => handelSaveAndSubmit(e)}
      className="p-6 text-white bg-gray-800 shadow-md w-full  space-y-5"
    >
      <h2 className="text-2xl font-bold ">Account Settings</h2>

      {/* Email Input */}
      <div>
        <label className="block  font-medium mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="w-full text-black p-3 border border-gray-300 rounded-lg bg-gray-100 placeholder:text-gray-900 outline-none focus:border-blue-500 transition"
        />
      </div>

      {employeeId && (
        <div>
          <label className="block font-medium mb-1">Company Name</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Enter your company name"
            className="w-full text-black p-3 border border-gray-300 rounded-lg bg-gray-100 placeholder:text-gray-900 outline-none focus:border-blue-500 transition"
          />
        </div>
      )}

      {/* Password Input with Show/Hide Toggle */}
      <div>
        <label className="block font-medium mb-1">New Password</label>
        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-100 p-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none  text-gray-900"
          />
          <p
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600 hover:text-blue-500 transition cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </p>
        </div>
      </div>

      {/* Save Changes Button */}
      <button className="w-full bg-blue-600 hover:bg-blue-500 transition duration-200 p-3 rounded-lg text-white font-semibold shadow-md">
        Save Changes
      </button>
    </form>
  );
}

export default Setting;
