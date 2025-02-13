function HomepageFooter() {
  return (
    <footer className="bg-gray-800 text-white grid md:grid-cols-[0.8fr_1fr] items-center font-serif p-6 shadow-2xl">
      {/* Logo Section */}
      <div className="w-[150px] mx-auto md:mx-0">
        <img
          src="/assets/TechLogo-removebg-preview.png"
          alt="TechLogo"
          className="max-w-[150px]"
        />
      </div>

      {/* Links & Social Media Section */}
      <div className="flex flex-col items-center space-y-6 px-6 text-center md:text-left">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-between w-full gap-4">
          {[
            "About Us",
            "Contact Us",
            "Careers",
            "Privacy Policy",
            "Terms of Service",
          ].map((text, index) => (
            <a
              key={index}
              href="#"
              className="hover:text-blue-400 duration-300"
            >
              {text}
            </a>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-10">
          {/* Social Icons */}
          <div className="flex text-xl space-x-4">
            {[
              { icon: "fa-twitter", color: "text-blue-400" },
              { icon: "fa-instagram", color: "text-pink-400" },
              { icon: "fa-facebook", color: "text-blue-600" },
              { icon: "fa-youtube", color: "text-red-500" },
            ].map(({ icon, color }, i) => (
              <i
                key={i}
                className={`fa-brands ${icon} hover:${color} transition duration-300 cursor-pointer`}
              ></i>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2025 <span className="text-white font-bold">ImTech</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default HomepageFooter;
