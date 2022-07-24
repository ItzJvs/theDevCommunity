import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  let data = {};
  useEffect(() => {
    async function getData() {
      data = await axios.get("https://app-59a19034-e8a3-4b2c-b6a4-3f6d696e91c0.cleverapps.io/getAll");
    }
    getData();
    console.log(data);
  }, []);
  console.log("data: ", data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
