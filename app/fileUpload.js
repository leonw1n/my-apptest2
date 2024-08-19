"use client";

import { useRef, useState } from "react";

export default function HandleFileUpload() {
  const formRef = useRef("");
  const [uploadStatus, setUploadStatus] = useState("");

  const fileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await fetch("http://127.0.0.1:5000/uploads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Check for successful response
        setUploadStatus("Successful upload!");
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit = {fileUpload}>
        <input type="file" name="file" id="file" />
        <br></br>
        <button type= "submit">Upload File</button>
      </form>
        <p>{uploadStatus}</p>
    </div>
  );
}
