import React, { useState } from "react";
import s from "../Slider/Slider.module.css";
import { NavLink } from "react-router-dom";

export default function Slider({ proyects }) {
  const [cardCurrent, setCardCurrent] = useState(0);
  const amount = proyects?.length;

  if (!Array.isArray(proyects) || amount === 0)
    return <h2 className={s.h2NoProjects}>No hay proyectos disponibles</h2>;

  const nextCard = () => {
    setCardCurrent(cardCurrent === amount - 1 ? 0 : cardCurrent + 1);
  };

  const previousCard = () => {
    setCardCurrent(cardCurrent === 0 ? amount - 1 : cardCurrent - 1);
  };

  return (
    <div className={s.divContainerMain}>
      <button className={s.buttonSlider} onClick={previousCard}>
        ❮
      </button>
      {proyects?.map((proyect, index) => {
        return (
          <div>
            {cardCurrent === index && (
              <div className={s.divContainer}>
                <h2 className={s.h2Title}>{proyect.title}</h2>
                <div className={s.divImgAndDescription}>
                  <img
                    key={index}
                    src={proyect.img}
                    alt={proyect.title}
                    className={s.imageProyect}
                  />
                  <p className={s.description}>{proyect.description}</p>
                </div>
                <NavLink
                  to={proyect.linkapp}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  className={s.navLinkBtn}
                >
                  <button className={s.btnIrAlProyecto}>Ir al Proyecto</button>
                </NavLink>{" "}
              </div>
            )}
          </div>
        );
      })}
      <button className={s.buttonSlider} onClick={nextCard}>
        ❯
      </button>
    </div>
  );
}