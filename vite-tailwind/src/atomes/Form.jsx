import React, { useState } from "react";
//import AddWord from "../../api/wordApi"; // The hook for mutation (AddWord)
//import { useMutation } from "react-query";

const WordAdd = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState(""); // To display the file name
  const [selectedFile, setSelectedFile] = useState(null); // Store the file
  const [wordAdd, setWordAdd] = useState("");
  //const addWordMutation = AddWord(); // This is the hook that triggers the mutation
  const userid = localStorage.getItem("userid"); // Get user ID from localStorage

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the file name
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Convert file to Base64 URL
      setSelectedFile(file); // Save the selected file
    }
  };

  // Handle form submission
  const handleAddWord = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    if (!selectedFile) {
      console.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("wordAdd", wordAdd); // Append the word
    formData.append("userid", userid); // Append the user ID
    formData.append("image", selectedFile); // Append the image file

    try {
      // Trigger the mutation by passing FormData to mutate function
    //   await addWordMutation.mutateAsync(formData);
      console.log("Word added successfully");
    } catch (error) {
      console.error("Failed to add word:", error);
    }
  };

  return (
    <form onSubmit={handleAddWord}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Add New Word
        </h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Word
            </label>
            <input
              type="text"
              placeholder="Enter Word"
              required
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={wordAdd}
              onChange={(e) => setWordAdd(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Word Image
            </label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="requestedBy"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold shadow focus:outline-none focus:shadow-outline"
              >
                Choose File
              </label>
              <input
                type="file"
                id="requestedBy"
                name="requestedBy"
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="hidden"
              />
              <span className="text-gray-600 text-sm">
                {fileName || "No file selected"}
              </span>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="h-[300px] w-[500px] object-cover border rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WordAdd;
