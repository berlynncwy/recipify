import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState();
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (selectedFile.size <= maxSize) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
          console.log(reader.result);
          setImage(reader.result);
          setError(null);
        };

        reader.onerror = (error) => {
          console.log("Error: ", error);
          setError("Error reading the file.");
          setImage(null);
        };
      } else {
        setError("Image size exceeds 5MB. Please choose a smaller image.");
        setImage(null);
        event.target.value = null; // Clear the file input
      }
    }
  };

  return (
    <>
      <div>
        <label>Upload Image</label>
        <input
          type="file"
          accept=".jpeg, .png, .jpg"
          onChange={handleChange}
          className="mb-4"
        ></input>
        {error && <p className="text-danger">{error}</p>}
        {image && <img src={image} alt="Uploaded" />}
      </div>
    </>
  );
};

export default ImageUploader;
