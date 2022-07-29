import "./components.css";
import devLogo from "../assets/logoBorder.png";
import search from "../assets/search.png";
import { NavLink } from "react-router-dom";
import { LinkText } from "./Cards/leftColCards";
const Button = ({ type }) => {
  return type == "login" ? (
    <NavLink to="login" className="loginButton">
      Log in
    </NavLink>
  ) : (
    <NavLink to="createAc" className="registerButton">
      Create account
    </NavLink>
  );
};
const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav">
        <div className="nav-left">
          <NavLink to="/" className="logo">
            <img src={devLogo} />
          </NavLink>
          <input type="text" className="searchBar" placeholder="Search.." />
          <img src={search} className="searchInputLogo login" />
        </div>
        <div className="nav-right">
          <Button type="login" />
          <Button type="register" />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="loginComponent">
      <h2> Welcome to DEV Community</h2>
      <span className="descLogin">
        <span>DEV Community</span> is a community of 883,563 amazing developers{" "}
      </span>
      <span className="Apple_login">
        <LinkText text="Continue with Apple" image="" path="/login" key="apple" />
      </span>
      <span className="Forem_login">
        <LinkText text="Continue with Forem" image="" path="/login" key="forem" />
      </span>
      <span className="Github_login">
        <LinkText text="Continue with Github" image="" path="/login" key="github" />
      </span>
      <span className="tweeter_login">
        <LinkText text="Continue with tweeter" image="" path="/login" key="tweeter" />
      </span>
      <span name="sectionLink"> Have a password? Continue with your email address</span>
      <span>
        <form className="loginForm">
          <b>Email</b>
          <input type="text" name="email" id="email" />
          <b>password</b>

          <input type="password" name="password" id="password" />
          <span>
            <input type="checkbox" name="rememberme" id="rememberme" /> Remember me
          </span>
          <button type="submit">Continue</button>
          <span name="forgot">I forgot my password</span>
        </form>
      </span>
    </div>
  );
};

const Register = () => {
  return <div className="registerComponent">this is Register page..</div>;
};
export default NavBar;
export { Login, Register, Button };
