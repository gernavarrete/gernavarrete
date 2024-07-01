import React from "react";
import "./SobreMi.css";
import Avatar from "../../images/PhotoRoom-20230315_190505.jpg";

export default function SobreMi() {
  return (
    <div className="main-div-sobremi" id="divSobreMi">
      <div className="div-avatar-h1" id="divAvatarH1">
        <img className="avatar" src={Avatar} alt="German Dario Navarrete" />
        <h1 className="h1-title" id="h1-title">
          Mi Background
        </h1>
      </div>
      <div className="div-paragraph" id="divParagraph">
        <h2 className="h2-title" id="h2Title">
          Te invito a conocerme un poco mas!
        </h2>
        <span id="pMain">
          <p id="p1Description">
            {" "}
            Impulsado por una década de excelencia administrativa en Registro Automotor Maipú 1 y la pasión por la tecnología, hice la transición al desarrollo web, dominando JavaScript, React.js y Node.js. En Henry Bootcamp, no solo desarrollé proyectos orientados a soluciones, sino que también fomenté el éxito de los estudiantes como asistente de enseñanza, mostrando mi destreza para resolver problemas y mis habilidades de colaboración en equipo.
          </p>
        </span>
      </div>
    </div>
  );
}
