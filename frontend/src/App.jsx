import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Pages from "./Pages";
import Components from "./Components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Components.Navbar />
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/encrypt" element={<Pages.Encrypt />} />
          <Route path="/decrypt" element={<Pages.Decrypt />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
