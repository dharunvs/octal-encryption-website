import React, { useState, useRef } from "react";
import axios from "axios";
import Components from "../../Components";
import Assets from "../../Assets";
import "./Decrypt.css";

function Decrypt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [decrypted, setDecrypted] = useState(false);

  const handleUpload = async () => {
    if (selectedFile != null) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios
          .post("http://localhost:8080/uploadImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setTimeout(() => {
              reset();
              setDecrypted(true);
            }, 10000);
          });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      await axios
        .get("http://localhost:8080/downloadDecrypted")
        .then((res) => {
          setText(res.data.output);
        })
        .then(() => {
          reset2();
        });
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    document.getElementById("uploadInput").value = "";
    setLoading(false);
  };

  const reset2 = () => {
    setLoading2(false);
  };

  return (
    <div className="Decrypt">
      <div className="left">
        <div className="top">
          <p>Decrypted text output</p>
          <textarea
            name="inputData"
            id="inputData"
            cols="50"
            rows="15"
            value={text}
            disabled
          ></textarea>
        </div>
        <p>-------------- {"(or)"} --------------</p>
        <div className="bottom">
          {selectedFile != null ? (
            <div className="selectedFile">
              <p>{selectedFile.name}</p>
              <div
                className="remove"
                onClick={() => {
                  setSelectedFile(null);
                  document.getElementById("uploadInput").value = "";
                }}
              >
                <Assets.icons.svg.Trash />
              </div>
            </div>
          ) : (
            <p>Choose image to decrypt {"(.png)"}</p>
          )}
          <label className="uploadButton">
            <input
              type="file"
              accept=".png"
              id="uploadInput"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                console.log(e.target.files);
              }}
            />
            <Assets.icons.svg.Upload />
            <p>Upload</p>
          </label>
        </div>
      </div>

      <div className="line"></div>

      <div className="right">
        <h1>Decrypt</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum,
          cumque!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum,
          cumque!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum,
          cumque!
        </p>

        {loading ? (
          <Components.Loader />
        ) : (
          <button
            onClick={() => {
              if (selectedFile != null) {
                setLoading(true);
              }
              handleUpload();
            }}
          >
            <Assets.icons.svg.Key />
            <p>Decrypt</p>
          </button>
        )}

        {decrypted &&
          (loading2 ? (
            <Components.Loader />
          ) : (
            <button
              onClick={() => {
                setLoading2(true);
                setTimeout(() => {
                  handleDownload();
                }, 3000);
              }}
            >
              <Assets.icons.svg.Load />
              <p>Load Text</p>
            </button>
          ))}
      </div>
    </div>
  );
}

export default Decrypt;
