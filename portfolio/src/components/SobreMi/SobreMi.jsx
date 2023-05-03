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
            A mis 13 años mis viejos con mucho esfuerzo nos compraron la primer
            computadora, yo estaba decidido a estudiar alguna carrera afín a
            contaduría; pero este hecho cambio mi rumbo por completo, vi en esa
            fabulosa maquina un potencial increíble que permitía explorar un
            nuevo mundo de soluciones, creatividad y diversión, fue desde
            entonces que empecé a interiorizarme un poco mas por la tecnología.
          </p>
          <p id="p2Description">
            {" "}
            Luego a mis 18 años comencé a estudiar Ingeniería en Sistemas en la
            Universidad Tecnológica Nacional con el fin de seguir mis deseos por
            adentrarme un poco mas en el mundo IT y poder interactuar con esa
            maquina en el mismo idioma, para mi mala suerte nunca pude terminar
            esa carrera ya que por situaciones personales no continúe, pero
            siempre me quedo como esa tarea pendiente de cumplir, con lo que
            realmente me gusta hacer.
          </p>
          <p id="p3Description">
            {" "}
            Fui pasando por varios trabajos los cuales no me gustaban pero por
            cuestiones económicas los debía realizar, hace ya 10 años que
            trabajo en el sector de administración, asesoría con atención al
            cliente y funciones de cajero, paralelamente siempre he sido
            emprendedor tuve dos emprendimientos los cuales no dieron los frutos
            esperados, soy también Productor Asesor de Seguros, actividad que
            desarrollo hace mas de 5 años, pero aunque buscaba una profesión
            ninguna me llenaba o me hacia sentir a gusto, hasta que un día; como
            soy de escuchar podcast y ver videos de desarrollo personal, ventas,
            marketing digital, neuromarketing, emprendimientos, etc, me tope con
            soyHenry y me encanto su propuesta, ya que ofrecía lo que yo siempre
            quise estudiar de un manera mas intensiva y sin un costo inicial,
            eso marcó un antes y un después en mi vida, hoy ya terminando y
            consolidando lenguajes y herramientas como HTML, CSS, Javascript,
            React.js, Node.js, Express.js puedo decir que me apasiona y que
            podría pasar horas escribiendo codigo sin darme cuenta del tiempo
            que paso.
          </p>
          <p id="p4Description">
            Quería agradecerte si llegaste hasta aquí e invitarte a que si
            llegas a necesitar algún desarrollador con ganas, responsabilidad,
            flexibilidad y full time, no dudes en contactarme. Me encantaría
            poder sumarme a un equipo de trabajo que tenga ganas de crecer y
            seguir impactando de la mejor manera, con la tecnología, en la vida
            cotidiana de las personas y otorgarle el confort que la sociedad se
            merece.
          </p>
        </span>
      </div>
    </div>
  );
}
