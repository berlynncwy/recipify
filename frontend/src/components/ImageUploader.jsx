import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState();

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.files);
    setImage(URL.createObjectURL(event.target.files[0]));
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
        <img src={image}></img>
      </div>
    </>
  );
};

export default ImageUploader;
