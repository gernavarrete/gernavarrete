import React from "react";
import s from "../Proyectos/Proyectos.module.css";
import Slider from "../Slider/Slider";
import { Proyects } from "../../mockups/mockups.js";

export default function Proyectos() {
  return (
    <div className={s.divProjects}>
      <h1 className={s.h1Title}>Proyectos</h1>
      <Slider proyects={Proyects} />
    </div>
  );
}
