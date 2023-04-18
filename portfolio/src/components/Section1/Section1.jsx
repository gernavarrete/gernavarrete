import React from "react";
import "./Section1.css";
import javascript from "../../images/JavaScript_unofficial_logo.svg";
import react from "../../images/React-icon.svg";
import node from "../../images/Node.js_logo.svg";
import macbookair from "../../images/MacBook-Air.png";
import splash from "../../images/pngegg (1).png";
import { Link } from "react-router-dom";

export default function Section1() {
  return (
    <div className="main-div-section1">
      <div className="div-text-section1">
        <h1>
          Me desempeño como <span>Desarrollador Fullstack</span>
        </h1>
        <p className="parrafo-sobremi">
          Soy apasionado por la creación de proyectos innovadores y de alto
          impacto. Me interesa trabajar en equipos multidisciplinarios y en
          proyectos que permitan utilizar y desarrollar mis habilidades técnicas
          y creativas para brindar soluciones innovadoras y escalables a los
          usuarios finales.
        </p>
        <div className="div-buttons">
          <Link to="/cv-german-navarrete" target="_blank">
            <button className="button-ir-al-cv">Ir al CV</button>
          </Link>
          <button className="button-verproyectos">Ver Proyectos</button>
        </div>
        <div className="div-tecnologias">
          <div className="div-logo-tecnologia">
            <img
              className="logo-tecnologias"
              src={javascript}
              alt="javascript-logo"
            />
            <p className="text-tecnologias">Javascript</p>
          </div>
          <div className="div-logo-tecnologia">
            <img className="logo-tecnologias" src={react} alt="react-logo" />
            <p className="text-tecnologias">React JS</p>
          </div>
          <div className="div-logo-tecnologia">
            <img className="logo-tecnologias node" src={node} alt="node-logo" />
            <p className="text-tecnologias">Node JS</p>
          </div>
        </div>
      </div>
      <div className="div-image-section1">
        <img className="image-splash" src={splash} alt="splash" />
        <img className="image-macbook" src={macbookair} alt="MacBook-Air" />
      </div>
    </div>
  );
}
