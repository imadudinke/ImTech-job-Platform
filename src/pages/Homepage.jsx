import Hero from "../components/Hero";
import HomeNavbar from "../components/HomeNavbar";
import HomepageFooter from "../components/HomepageFooter";

function Homepage() {
  return (
    <div className="h-screen bg-gray-700 ">
      <header className="shadow-2xs">
        <HomeNavbar />
      </header>
      <main className="  text-white flex">
        <Hero />
      </main>
      <HomepageFooter />
    </div>
  );
}

export default Homepage;
