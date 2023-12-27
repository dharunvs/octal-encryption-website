import React from "react";
import { useNavigate } from "react-router-dom";
import Assets from "../../Assets";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="box">
        <div className="content">
          <h1>Encrypt</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/encrypt");
          }}
        >
          <Assets.icons.svg.Lock />
          <p>Encrypt</p>
        </button>
      </div>
      <div className="box">
        <div className="content">
          <h1>Decrypt</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium labore harum.
          </p>
        </div>
        <button
          onClick={() => {
            navigate("/decrypt");
          }}
        >
          <Assets.icons.svg.Key />
          <p>Decrypt</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
