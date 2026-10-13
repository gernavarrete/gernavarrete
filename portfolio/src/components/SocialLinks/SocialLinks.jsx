import s from "./SocialLinks.module.css";
import { links } from "../../content/links.js";

export default function SocialLinks() {
  return (
    <ul className={s.social}>
      {links.social.map(({ label, href, viewBox, path }) => (
        <li key={label}>
          <a
            className={s.socialLink}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <svg className={s.icon} viewBox={viewBox} aria-hidden="true" focusable="false">
              <path fillRule="evenodd" d={path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
