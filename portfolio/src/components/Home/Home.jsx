import { useState } from "react";
import NavBar from "../Navbar/NavBar.jsx";
import Section1 from "../Section1/Section1.jsx";

export default function Home() {
  const [viewComponent, setViewComponent] = useState();

  const changeComponent = (component) => {
    setViewComponent(component);
  };

  return (
    <div>
      <NavBar changeComponent={changeComponent} component={viewComponent} />
      {viewComponent ? viewComponent : <Section1 />}
    </div>
  );
}
