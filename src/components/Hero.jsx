import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gray-700 text-white font-mono   grid md:grid-cols-[0.7fr_1fr] items-center justify-between px-6 md:px-12 py-16">
      <div className=" space-y-4">
        <h1 className="text-4xl font-bold leading-tight">
          Find Your <span className="text-blue-400">Dream Job</span> with{" "}
          <span className="text-yellow-400">ImTech</span>
        </h1>
        <p className="text-lg text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          nihil ad atque velit alias id et odit, rerum quas rem cumque odio
          maiores dignissimos totam sunt exercitationem error minima dolorum.
        </p>
        <Link to="/signup">
          <button className="mt-4 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>

      <div className="mt-8 md:mt-0 flex justify-self-end">
        <img
          src="/assets/jobSerach-img.png"
          alt="Job Search"
          className="w-full  max-w-md rounded-lg  "
        />
      </div>
    </div>
  );
}

export default Hero;
