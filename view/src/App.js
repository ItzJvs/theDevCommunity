import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://app-59a19034-e8a3-4b2c-b6a4-3f6d696e91c0.cleverapps.io/getAll").then(async (res) => {
      setData(await res.json());
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {data.map((data) => {
          return (
            <pre>
              Username : {data?.name} Password : {data?.password} <br />
            </pre>
          );
        })}
      </header>
    </div>
  );
}

export default App;
