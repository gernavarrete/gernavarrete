import s from "../Navbar/NavBar.module.css";
import { Link, useParams } from "react-router-dom";

// Monochrome marks drawn from the previous brand SVGs; the inner glyphs are
// cut out with evenodd so the icons follow currentColor on any background.
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/germandnavarrete/",
    viewBox: "0 0 90 90",
    path: "M0 6.447C0 2.887 2.978 0 6.651 0h76.698C87.022 0 90 2.887 90 6.447v77.106C90 87.114 87.022 90 83.349 90H6.651C2.978 90 0 87.114 0 83.553V6.447zM20.485 29.151c4.74 0 7.691-3.121 7.691-7.021-.088-3.988-2.95-7.022-7.601-7.022-4.65 0-7.69 3.034-7.69 7.022 0 3.9 2.95 7.021 7.512 7.021zM27.282 75.339v-40.64H13.688v40.64zM34.804 75.339h13.594V52.644c0-1.215.088-2.428.447-3.296.983-2.427 3.219-4.94 6.975-4.94 4.919 0 6.887 3.727 6.887 9.19v21.741h13.592V52.037c0-12.483-6.706-18.291-15.65-18.291-7.333 0-10.553 4.073-12.342 6.847h.091v-5.894H34.804c.178 3.814 0 40.64 0 40.64z",
  },
  {
    label: "GitHub",
    href: "https://github.com/gernavarrete",
    viewBox: "0 0 16 16",
    path: "M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/German017645362",
    viewBox: "126.444 2.281 589 589",
    path: "M126.444 296.781a294.5 294.5 0 1 0 589 0a294.5 294.5 0 1 0-589 0zM609.773 179.634c-13.891 6.164-28.811 10.331-44.498 12.204 16.01-9.587 28.275-24.779 34.066-42.86a154.78 154.78 0 0 1-49.209 18.801c-14.125-15.056-34.267-24.456-56.551-24.456-42.773 0-77.462 34.675-77.462 77.473 0 6.064.683 11.98 1.996 17.66-64.389-3.236-121.474-34.079-159.684-80.945-6.672 11.446-10.491 24.754-10.491 38.953 0 26.875 13.679 50.587 34.464 64.477a77.122 77.122 0 0 1-35.097-9.686v.979c0 37.54 26.701 68.842 62.145 75.961-6.511 1.784-13.344 2.716-20.413 2.716-4.998 0-9.847-.473-14.584-1.364 9.859 30.769 38.471 53.166 72.363 53.799-26.515 20.785-59.925 33.175-96.212 33.175-6.25 0-12.427-.373-18.491-1.104 34.291 21.988 75.006 34.824 118.759 34.824 142.496 0 220.428-118.052 220.428-220.428 0-3.361-.074-6.697-.236-10.021a157.855 157.855 0 0 0 38.707-40.158z",
  },
];

const navLinks = [
  { id: "inicio", to: "/inicio", label: "Inicio" },
  { id: "sobremi", to: "/sobremi", label: "Sobre mi" },
  { id: "proyectos", to: "/proyectos", label: "Proyectos" },
];

const NavBar = () => {
  const params = useParams();
  // Mirrors Home: any route other than sobremi/proyectos renders Inicio.
  const current = ["sobremi", "proyectos"].includes(params.component)
    ? params.component
    : "inicio";

  return (
    <header className={s.NavBarContainer}>
      <div className={s.inner}>
        <div className={s.identity}>
          <p className={s.name}>German Dario Navarrete</p>
          <ul className={s.social}>
            {socialLinks.map(({ label, href, viewBox, path }) => (
              <li key={label}>
                <a
                  className={s.socialLink}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <svg
                    className={s.icon}
                    viewBox={viewBox}
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path fillRule="evenodd" d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Navegación principal">
          <ul className={s.links}>
            {navLinks.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  className={s.link}
                  to={to}
                  id={id}
                  aria-current={current === id ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
