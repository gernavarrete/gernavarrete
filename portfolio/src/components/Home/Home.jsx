import { useEffect, useState } from "react";
import "./Home.css";
import NavBar from "../Navbar/NavBar.jsx";
import Section1 from "../Section1/Section1.jsx";
import { useParams } from "react-router-dom";
import SobreMi from "../SobreMi/SobreMi.jsx";
import Proyectos from "../Proyectos/Proyectos.jsx";

export default function Home() {
  const [viewComponent, setViewComponent] = useState();
  const params = useParams();

  const changeComponent = (component) => {
    setViewComponent(component);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- view switching on route param change is intentional; refactor tracked for design-system sprint
    if (params.component === "sobremi") changeComponent(<SobreMi />);
    else if (params.component === "proyectos") changeComponent(<Proyectos />);
    else changeComponent(<Section1 />);
  }, [params.component]);

  return (
    <div className="main-div-home">
      <NavBar />
      {viewComponent ? viewComponent : <Section1 />}
    </div>
  );
}
