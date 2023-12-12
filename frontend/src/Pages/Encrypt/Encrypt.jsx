import React, { useState, useRef } from "react";
import axios from "axios";
import Components from "../../Components";
import Assets from "../../Assets";
import "./Encrypt.css";

function Encrypt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  const handleUpload = async () => {
    if (selectedFile != null) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        await axios
          .post("http://localhost:8080/uploadFile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setTimeout(() => {
              reset();
              setEncrypted(true);
            }, 5000);
          });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else if (text.trim() != "") {
      try {
        await axios
          .post("http://localhost:8080/uploadText", {
            text: text,
          })
          .then(() => {
            setTimeout(() => {
              reset();
              setEncrypted(true);
            }, 5000);
          });
      } catch (error) {
        console.error("Error uploading text:", error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      await axios
        .get("http://localhost:8080/downloadEncrypted", {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "encrypted.zip");
          document.body.appendChild(link);
          link.click();
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
    setText("");
    document.getElementById("uploadInput").value = "";
    setLoading(false);
  };

  const reset2 = () => {
    setLoading2(false);
  };

  return (
    <div className="Encrypt">
      <div className="left">
        <div className="top">
          <p>Enter text to encrypt</p>
          <textarea
            name="inputData"
            id="inputData"
            cols="50"
            rows="15"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
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
            <p>Choose text file {"(.txt)"}</p>
          )}
          <label className="uploadButton">
            <input
              type="file"
              accept=".txt"
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
        <h1>Encrypt</h1>
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
              if (selectedFile != null || text.trim() != "") {
                setLoading(true);
              }

              handleUpload();
            }}
          >
            <Assets.icons.svg.Lock />
            <p>Encrypt</p>
          </button>
        )}
        {encrypted &&
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
              <Assets.icons.svg.Download />
              <p>Download</p>
            </button>
          ))}
      </div>
    </div>
  );
}

export default Encrypt;
