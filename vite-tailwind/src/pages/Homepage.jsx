import { Link } from "react-router-dom";
import child from "../assets/childs.png";
import { Heart, Star, Sun } from "lucide-react";

const Homepage = () => {
  return (
    <div className="grid lg:grid-cols-2 mb-10 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="flex justify-center items-center h-full">
        <div>
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Every Child Shines</span>
            <span className="block text-blue-600 dark:text-white">
              In Their Own Way
            </span>
          </h1>

          <div className="flex justify-center space-x-4 mt-6">
            <Star className="text-yellow-400" size={24} />
            <Heart className="text-red-400" size={24} />
            <Sun className="text-orange-400" size={24} />
          </div>

          <p className="mt-6 max-w-md mx-auto text-xl dark:text-gray-200 text-gray-500 sm:text-2xl md:mt-8 md:max-w-3xl">
            Embracing unique learning journeys, celebrating every milestone, and
            building a brighter future together.
          </p>
          <div className="pt-10">
            <Link
              to="/login"
              className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md mr-4 hover:bg-blue-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl lg:h-[635px] h-full w-full object-scale-down"
          src={child}
          alt=""
        />
      </div>
    </div>
  );
};

export default Homepage;
