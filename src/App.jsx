import { StrictMode } from "react";
import fruitCastLogo from "/fruit_cast.svg";
import "./App.css";
// import Problem from "./Problem1.jsx";
// import Problem from "./Problem2.jsx";
// import Problem from "./Problem3.jsx";
// import Problem from "./Problem4.jsx";
import Problem from "./Problem5.jsx";

function App() {
  return (
    <StrictMode>
      <div className="flex flex-col items-center">
        <a href="https://fruitcast.co.uk" target="_blank">
          <img
            src={fruitCastLogo}
            className="logo"
            alt="FruitCast logo"
            style={{ height: "150px" }}
          />
        </a>
        <h1>FruitCast Web Development Interview</h1>
      </div>
      <Problem />
    </StrictMode>
  );
}

export default App;
