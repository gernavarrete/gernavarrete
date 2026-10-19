import s from "../Navbar/NavBar.module.css";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import { sections } from "../../content/sections.js";

const navSections = sections.filter((section) => section.nav);

const NavBar = ({ active }) => {
  return (
    <header className={s.NavBarContainer}>
      <a className={s.skip} href="#main">
        Saltar al contenido
      </a>
      <div className={s.inner}>
        <div className={s.identity}>
          <a className={s.name} href="#inicio">
            German Dario Navarrete
          </a>
          <SocialLinks />
        </div>
        <nav aria-label="Navegación principal">
          <ul className={s.links}>
            {navSections.map(({ id, label }) => (
              <li key={id}>
                <a
                  className={s.link}
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
