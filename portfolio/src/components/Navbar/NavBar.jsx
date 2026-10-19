import s from "../Navbar/NavBar.module.css";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";

// Section anchors of the single-page home; each section adds its own link.
const navLinks = [{ href: "#inicio", label: "Inicio" }];

const NavBar = () => {
  return (
    <header className={s.NavBarContainer}>
      <div className={s.inner}>
        <div className={s.identity}>
          <p className={s.name}>German Dario Navarrete</p>
          <SocialLinks />
        </div>
        <nav aria-label="Navegación principal">
          <ul className={s.links}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a className={s.link} href={href}>
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
