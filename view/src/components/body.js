import { Route, Routes } from "react-router-dom";
import Feed from "./feed";
import { Login, Register } from "./navbar";

let Body = () => {
  return (
    <div className="mainBody">
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="createAc" element={<Register />}></Route>
      </Routes>
    </div>
  );
};

export default Body;
