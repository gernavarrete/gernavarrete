import s from "../Navbar/NavBar.module.css";
import linkedin from "../../images/linkedin-logo-2430.svg";
import github from "../../images/Octicons-mark-github.svg";
import twitter from "../../images/cdnlogo.com_twitter-icon.svg";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const NavBar = () => {
  const params = useParams();

  return (
    <div className={s.NavBarContainer}>
      <p>German Dario Navarrete</p>
      <div className={s.containerLogos}>
        <NavLink
          to="https://www.linkedin.com/in/germandarionavarrete/"
          target="_blank"
        >
          <img className={s.logo} src={linkedin} alt="linkedin-logo"></img>
        </NavLink>
        <NavLink to="https://github.com/gernavarrete" target="_blank">
          <img className={s.logo} src={github} alt="github-logo"></img>
        </NavLink>
        <NavLink to="https://twitter.com/German017645362" target="_blank">
          <img className={s.logo} src={twitter} alt="twitter-logo"></img>
        </NavLink>
      </div>
      <div className={s.containerLinks}>
        <NavLink
          className={s.inicio}
          style={{ textDecoration: "none" }}
          to="/inicio"
          id="inicio"
        >
          <h3
            // onClick={(e) => setComponent(<Section1 />)}
            className={params.component === "inicio" ? s.selected : null}
          >
            Inicio
          </h3>
        </NavLink>
        <NavLink
          className={s.sobremi}
          style={{ textDecoration: "none" }}
          to="/sobremi"
          id="sobremi"
        >
          <h3
            //onClick={(e) => setComponent(<SobreMi />)}
            className={params.component === "sobremi" ? s.selected : null}
          >
            Sobre mi
          </h3>
        </NavLink>
        <NavLink
          className={s.proyectos}
          style={{ textDecoration: "none" }}
          to="/proyectos"
          id="proyectos"
        >
          <h3
            //onClick={(e) => setComponent(<Proyectos />)}
            className={params.component === "proyectos" ? s.selected : null}
          >
            Proyectos
          </h3>
        </NavLink>
        {/*<NavLink
          className="contactame"
          style={{ textDecoration: "none" }}
          to="/contactame"
          id="contactame"
        >
          <h3
            onClick={(e) => changeComponent(<Contactame />)}
            className={params["*"] === "contactame" ? "selected" : null}
          >
            Contactame
          </h3> 
  </NavLink>*/}
      </div>
      <div className={s.containerToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default NavBar;
