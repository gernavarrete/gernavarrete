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
        <NavLink>
          <img className="logo" src={linkedin} alt="linkedin-logo"></img>
        </NavLink>
        <NavLink>
          <img className="logo" src={github} alt="github-logo"></img>
        </NavLink>
        <NavLink>
          <img className="logo" src={twitter} alt="twitter-logo"></img>
        </NavLink>
      </div>
      <div className="container-links">
        <NavLink>
          <h3>Inicio</h3>
        </NavLink>
        <NavLink>
          <h3>Sobre mi</h3>
        </NavLink>
        <NavLink>
          <h3>Servicios</h3>
        </NavLink>
        <NavLink>
          <h3>Contactame</h3>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
