import { Link } from "react-router-dom";
import err from "../assets/error.png";

const NotFound = () => {
  const NotFound = err;
  return (
    <div className="mx-auto max-w-2xl mt-4 px-4  sm:px-6  lg:max-w-7xl lg:px-8">
      <div>
        <img
          src={NotFound}
          alt="404 Error"
          className="w-[400px] h-[400px] ml-auto mr-auto object-scale-down"
        />
      </div>
      <div className="text-center lg:text-8xl lg:mb-16 mb-5 text-sky-500 dark:text-white text-4xl">
        Whoops!
      </div>
      <div className="text-center text-3xl mb-5 text-blue-500 dark:text-white">
        The Page Your are looking it is not exists.
      </div>
      <div className="text-center text-xl mb-16 text-gray-500">
        Go Back to
        <Link to="/">
          <span className="text-blue-500"> Homepage </span>
        </Link>
        or <span className="text-blue-500"> Contact Us </span> about the problem
      </div>
    </div>
  );
};

export default NotFound;
