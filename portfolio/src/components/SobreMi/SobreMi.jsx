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
            Desde muy joven, siempre he sentido una gran pasión por la tecnología y la informática. Por eso, a los 18 años, decidí estudiar Ingeniería en Sistemas en la Universidad Tecnológica Nacional. Durante los primeros años de mi carrera, logré adquirir conocimientos valiosos y desarrollar habilidades importantes en el mundo de la tecnología. Sin embargo, después de cursar hasta tercer año, me vi obligado a abandonar mis estudios debido a circunstancias personales.
          </p>
          <p id="p2Description">
            {" "}
            Posteriormente, trabajé en varios empleos que no me satisfacían, pero que debía realizar por cuestiones económicas. Desde hace 10 años trabajo en el sector de administración, asesoría con atención al cliente y funciones de cajero. Paralelamente, siempre he sido emprendedor y tuve dos emprendimientos que no dieron los frutos esperados. También soy Productor Asesor de Seguros, actividad que desarrollo hace más de 5 años.
          </p>
          <p id="p3Description">
          A pesar de buscar una profesión que me llenara o me hiciera sentir a gusto, no encontré ninguna hasta que un día descubrí soyHenry. Me encantó su propuesta ya que ofrecía lo que siempre quise estudiar de una manera más intensiva y sin un costo inicial. Eso marcó un antes y un después en mi vida. Hoy, ya terminando y consolidando lenguajes y herramientas como HTML, CSS, Javascript, React.js, Node.js y Express.js puedo decir que me apasiona y que podría pasar horas escribiendo código sin darme cuenta del tiempo que pasa.
          </p>
          <p id="p4Description">
          Quería agradecerte por leer hasta aquí e invitarte a que si necesitas algún desarrollador con ganas, responsabilidad, flexibilidad y full time no dudes en contactarme. Me encantaría poder sumarme a un equipo de trabajo que tenga ganas de crecer y seguir impactando de la mejor manera con la tecnología en la vida.
          </p>
        </span>
      </div>
    </div>
  );
}
