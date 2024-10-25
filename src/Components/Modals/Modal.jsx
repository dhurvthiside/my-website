import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

export default function Modal({ open, onClose, setURL }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  function handleFileChange(e) {
    setImage(e.target.files[0]);
  }

  function handleUpload() {
    if (!image) return;
    const storageRef = ref(storage, "imageUploads/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is done");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setURL(downloadURL);
        });
      }
    );
  }

  return (
    <div
      style={{
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <h2>Enter the image</h2>
        <input type="file" onChange={handleFileChange} className="m-10" />
        <button onClick={handleUpload}>Upload</button>
        {progress > 0 && (
          <div>
            <p>{Math.ceil(progress)}%</p>
            <div
              style={{
                width: "60%",
                height: "8px",
                background: "#e0e0e0",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#3b82f6",
                }}
              />
            </div>
          </div>
        )}
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
}
