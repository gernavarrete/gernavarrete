import s from "./Footer.module.css";
import SocialLinks from "../SocialLinks/SocialLinks.jsx";
import { footer } from "../../content/closing.js";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <p className={s.owner}>
          {footer.owner} · {new Date().getFullYear()}
        </p>
        <SocialLinks />
        <p className={s.signature}>{footer.signature}</p>
      </div>
    </footer>
  );
}
