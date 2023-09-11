import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState();
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (selectedFile.size <= maxSize) {
        // File size is within the limit
        setImage(URL.createObjectURL(selectedFile));
        setError(null);
      } else {
        // File size exceeds the limit
        setError("Image size exceeds 5MB. Please choose a smaller image.");
        setImage(null);
      }
    }
  };

  return (
    <>
      <div>
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
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
