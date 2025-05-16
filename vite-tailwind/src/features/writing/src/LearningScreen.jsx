import { useState } from 'react';
import LetterDisplay from './LetterDisplay';
import WritingCanvas from './WritingCanvas';

const LearningScreen = () => {
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [lettersToLearn] = useState(['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'ඍ', 'ඎ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ', 'ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ය', 'ර', 'ල', 'ව', 'ශ', 'ෂ', 'ස', 'හ', 'ළ', 'ෆ']);
    const [learningStage, setLearningStage] = useState('presentation');
    const [guideLetter, setGuideLetter] = useState(null);
    const [capturedImageDisplay, setCapturedImageDisplay] = useState(null);
    const [backendResponse, setBackendResponse] = useState(null);

    const currentLetter = lettersToLearn[currentLetterIndex];

    const handleWriteNowClick = () => {
        setGuideLetter(currentLetter);
        setLearningStage('writing');
        setBackendResponse(null);
    };

    const handleDoneWriting = async (canvasImageData) => {
        console.log("Captured Canvas Image Data (Sending to backend)...");

        try {
            const response = await fetch('http://127.0.0.1:5000/writing/process_letter', { // **IMPORTANT: VERIFY THIS URL IS CORRECT FOR YOUR BACKEND!**
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageData: canvasImageData }),
            });

            if (!response.ok) {
                const message = `Backend Error: ${response.status} ${response.statusText}`;
                console.error(message);
                setBackendResponse({ error: message });
                throw new Error(message);

            } else {
                const responseData = await response.json();
                console.log("Backend Response Data:", responseData);
                setBackendResponse(responseData);
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            setBackendResponse({ error: "Failed to communicate with backend." });
        }

        setCapturedImageDisplay(canvasImageData);
        setCurrentLetterIndex((currentLetterIndex + 1) % lettersToLearn.length);
        setLearningStage('presentation');
        setGuideLetter(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Sinhala Letter Learning</h1>

            {learningStage === 'presentation' && (
                <LetterDisplay
                    letter={currentLetter}
                    onWriteNowClick={handleWriteNowClick}
                />
            )}

            {learningStage === 'writing' && (
                <WritingCanvas
                    onDoneWriting={handleDoneWriting}
                    guideLetter={guideLetter}
                />
            )}

            {capturedImageDisplay && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Last Captured Writing:</h3>
                    <img src={capturedImageDisplay} alt="Captured Letter" className="max-w-xs border border-gray-300 rounded" />
                </div>
            )}

            {backendResponse && (
                <div className="mt-4 text-left p-4 border border-gray-400 rounded bg-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Backend Response (Debug):</h3>
                    {backendResponse.error ? (
                        <p className="text-red-600">Error: {backendResponse.error}</p>
                    ) : (
                        <div>
                            <p>Predicted Letter: {backendResponse.predicted_letter}</p>
                            <p>Confidence Score: {backendResponse.confidence_score}</p>
                            <p>Next Letter Suggestion: {backendResponse.next_letter_suggestion}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LearningScreen;