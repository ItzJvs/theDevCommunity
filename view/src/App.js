import { Component } from "react";
import { HashRouter } from "react-router-dom";
import Body from "./components/body";
import NavBar from "./components/navbar";
import "./index.css";
export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="main">
        <HashRouter>
          <NavBar />
          <Body />
        </HashRouter>
      </div>
    );
  }
}
