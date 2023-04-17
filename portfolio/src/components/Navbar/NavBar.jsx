import "./NavBar.css";
import linkedin from "../../images/linkedin-logo-2430.svg";
import github from "../../images/Octicons-mark-github.svg";
import twitter from "../../images/cdnlogo.com_twitter-icon.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="NavBar-Container">
      <p>German Dario Navarrete</p>
      <div className="container-logos">
        <NavLink
          to="https://www.linkedin.com/in/germandarionavarrete/"
          target="_blank"
        >
          <img className="logo" src={linkedin} alt="linkedin-logo"></img>
        </NavLink>
        <NavLink to="https://github.com/gernavarrete" target="_blank">
          <img className="logo" src={github} alt="github-logo"></img>
        </NavLink>
        <NavLink to="https://twitter.com/German017645362" target="_blank">
          <img className="logo" src={twitter} alt="twitter-logo"></img>
        </NavLink>
      </div>
      <div className="container-links">
        <NavLink
          className="inicio"
          style={{ textDecoration: "none" }}
          to="/"
          id="inicio"
        >
          <h3>Inicio</h3>
        </NavLink>
        <NavLink
          className="sobremi"
          style={{ textDecoration: "none" }}
          to="/sobremi"
          id="sobremi"
        >
          <h3>Sobre mi</h3>
        </NavLink>
        <NavLink
          className="servicios"
          style={{ textDecoration: "none" }}
          to="/servicios"
          id="servicios"
        >
          <h3>Servicios</h3>
        </NavLink>
        <NavLink
          className="contactame"
          style={{ textDecoration: "none" }}
          to="/contactame"
          id="contactame"
        >
          <h3>Contactame</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
