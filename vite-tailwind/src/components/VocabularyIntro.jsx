import vocabulary from "../assets/vocab.png";
const VocabularyIntro = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:py-16 md:px-32">
      {/* Left Section: Text Content */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-sky-600 mb-4">
          Improve Speeching
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Let’s make learning new words exciting and fun! Explore colorful
          pictures, playful sounds, and interactive games that help kids
          discover and remember new words easily. Tap below to open a world of
          words and start the fun-filled journey to boost vocabulary!
        </p>
        <button className="bg-blue-100 text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-blue-200 transition">
          Lets Practice and Learn how to do it
        </button>
      </div>

      {/* Right Section: Illustration */}
      <div className="relative mt-8 md:mt-0">
        <img
          src={vocabulary}
          alt="writng Illustration"
          className="w-full max-w-md"
        />
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4"></div>
      </div>
    </div>
  );
};

export default VocabularyIntro;
