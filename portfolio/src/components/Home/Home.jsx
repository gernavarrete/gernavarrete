import "./Home.css";
import NavBar from "../Navbar/NavBar.jsx";
import Section1 from "../Section1/Section1.jsx";

export default function Home() {
  return (
    <div className="main-div-home">
      <NavBar />
      <main>
        <Section1 />
      </main>
    </div>
  );
}
