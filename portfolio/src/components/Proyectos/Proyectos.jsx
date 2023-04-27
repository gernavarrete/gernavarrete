import React from "react";
import s from "../Proyectos/Proyectos.module.css";
import Slider from "../Slider/Slider";
import mangiare from "../../images/Mangiare-min.png";
import foodapi from "../../images/FoodApi.png";

export default function Proyectos() {
  const Proyects = [
    {
      title: "Mangiar-e",
      img: mangiare,
      linkapp: "https://mangiare.vercel.app/",
      description:
        "Es un proyecto que nació de buscar una solución a la siguiente pregunta: ¿Qué cocinar hoy? Como sabemos que en muchas familias, el tiempo para planear la comida es escaso; debido a que en muchos casos ambos padres trabajan, o tienen otras actividades; decidimos brindarles una solución para que cuando llegue ese momento donde se preguntan qué comer, puedan con los ingredientes que poseen, encontrar una receta para crearla y en el caso de que algún ingrediente falte poder adquirirlo de manera fácil y rápida.",
      tecnologias:
        "Front: Javascript, React, Redux, Auth0, Nodemailer, Cloudinary, Localstorage, ChakraUi. Back: Javascript, Node.js, Express.js Base de datos: PostgreSQL y Sequelize.",
    },
    {
      title: "Food App",
      img: foodapi,
      linkapp: "https://foodapi-qp9m.onrender.com/",
      description:
        "FoodApp es una App creada para consultar una receta extraida de una api segun un parametro de busqueda como puede ser el nombre o la dieta, ademas se puede ordenar segun el score o alfabeticamente",
      tecnologias:
        "Front: Javascript, React, Redux. Back: Javascript, Node.js, Express.js. Base de datos: PostgreSQL y Sequelize.",
    },
  ];
  return (
    <div className={s.divProjects}>
      <h1 className={s.h1Title}>Proyectos</h1>
      <Slider proyects={Proyects} />
    </div>
  );
}
