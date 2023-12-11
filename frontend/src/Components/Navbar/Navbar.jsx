import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Assets from "../../Assets";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showTeam, setShowTeam] = useState(false);
  return (
    <nav>
      <div
        className="logo"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1>Title</h1>
      </div>
      <ul>
        <li
          onClick={() => {
            navigate("/encrypt");
          }}
        >
          <Assets.icons.svg.Lock />
          <p>Encrypt</p>
        </li>
        <li
          onClick={() => {
            navigate("/decrypt");
          }}
        >
          <Assets.icons.svg.Key />
          <p>Decrypt</p>
        </li>
        <li
          onClick={() => {
            setShowTeam(!showTeam);
          }}
        >
          <Assets.icons.svg.Team />
          <p>Team</p>
          {showTeam && (
            <div className="navTeam">
              <div className="teamMember">
                <p>M Karthik</p>
                <p>311020243009</p>
              </div>
              <div className="teamMember">
                <p>KarthikGF</p>
                <p>311020243009</p>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
