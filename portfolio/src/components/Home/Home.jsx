import "./Home.css";
import NavBar from "../Navbar/NavBar.jsx";
import Section1 from "../Section1/Section1.jsx";
import SystemsBand from "../SystemsBand/SystemsBand.jsx";
import Cases from "../Cases/Cases.jsx";
import Approach from "../Approach/Approach.jsx";
import Context from "../Context/Context.jsx";
import Contact from "../Contact/Contact.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Home() {
  return (
    <div className="main-div-home">
      <NavBar />
      <main>
        <Section1 />
        <SystemsBand />
        <Cases />
        <Approach />
        <Context />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
