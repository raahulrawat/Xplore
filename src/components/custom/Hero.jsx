import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import placeImage from "../../assets/tripplan.png";

function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf6f0] via-[#f3e8ff] to-[#e6f4ff] px-6 py-12">
      <div className="bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-3xl text-center border border-white/20">
        <h1 className="font-extrabold text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
          <span className="text-[#ff4d4f]">Discover Your Next Adventure with Ghoom AI</span>
          <br />
          <span className="text-gray-800">Personalized Itineraries at Your Fingertips</span>
        </h1>
        <p className="text-base lg:text-lg text-gray-700 mb-8">
          Your AI-powered travel companion – crafting custom itineraries tailored to your style, interests, and budget.
        </p>
        <Link to={"/create-trip"}>
          <Button className="bg-black text-white text-base font-semibold px-6 py-3 rounded-full shadow hover:bg-white hover:text-black hover:border hover:border-black transition duration-300">
            Get Started, It&#39;s Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
