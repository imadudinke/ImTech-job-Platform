import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav className="flex justify-between items-center shadow-[5px 0px 15px 0px #0000]   bg-gray-800 shadow-2xl text-white px-8 py-2">
      <div className="flex items-center space-x-2">
        <img
          src="/assets/logoIcon.png"
          alt="removebg"
          className=" w-[70px] h-[70px]  shadow-lg"
        />
        <p className="text-4xl font-bold">ImTech</p>
      </div>
      <Link to="/signup">
        <button className="font-mono text-xl bg-[#0eb49bc6] px-6 py-2 rounded-lg cursor-pointer hover:bg-[#0eb49b]">
          Signup
        </button>
      </Link>
    </nav>
  );
}

export default HomeNavbar;
