import "./Home.css";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { sections } from "../../content/sections.js";
import SectionRail from "../SectionRail/SectionRail.jsx";
import ScrollProgress from "../ScrollProgress/ScrollProgress.jsx";
import NavBar from "../Navbar/NavBar.jsx";
import Section1 from "../Section1/Section1.jsx";
import SystemsBand from "../SystemsBand/SystemsBand.jsx";
import Cases from "../Cases/Cases.jsx";
import Approach from "../Approach/Approach.jsx";
import Context from "../Context/Context.jsx";
import Contact from "../Contact/Contact.jsx";
import Footer from "../Footer/Footer.jsx";

const sectionIds = sections.map((section) => section.id);

export default function Home() {
  const active = useActiveSection(sectionIds);

  return (
    <div className="main-div-home">
      <ScrollProgress />
      <NavBar active={active} />
      <main id="main" tabIndex={-1}>
        <Section1 />
        <SystemsBand />
        <Cases />
        <Approach />
        <Context />
        <Contact />
      </main>
      <Footer />
      <SectionRail active={active} />
    </div>
  );
}
