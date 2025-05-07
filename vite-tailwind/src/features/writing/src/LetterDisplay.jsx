
const LetterDisplay = ({ letter, onWriteNowClick }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Let's Learn to Write:</h2>
            <div className="text-9xl font-extrabold text-blue-600 mb-8">{letter}</div>
            <button
                className="px-8 py-4 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-full focus:outline-none focus:shadow-outline"
                onClick={onWriteNowClick}
            >
                Write Now!
            </button>
        </div>
    );
};

export default LetterDisplay;