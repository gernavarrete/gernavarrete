import mangiare from "../images/Mangiare.png";
import foodapi from "../images/FoodApi.png";
import starwars from "../images/screenshot1.png";
import fullstore from "../images/fullstore.png";

export const Proyects = [
  {
    title: "Mangiar-e",
    img: mangiare,
    linkapp: "https://mangiare.vercel.app/",
    description:
      "Este proyecto nació con el objetivo de brindar una solución a la pregunta que muchas familias se hacen diariamente: ¿Qué cocinar hoy? Sabemos que el tiempo para planear la comida es escaso, especialmente cuando ambos padres trabajan o tienen otras actividades. Por eso, decidimos crear una plataforma que les permita encontrar una receta con los ingredientes que poseen y, en caso de que falte alguno, adquirirlo de manera fácil y rápida. En resumen, nuestro proyecto busca simplificar la vida de las personas al momento de cocinar, ofreciéndoles una solución práctica y eficiente para que puedan disfrutar de una comida deliciosa sin tener que preocuparse por la planificación.",
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
  {
    title: "StarWarsChallenge",
    img: starwars,
    linkapp: "https://starwarschallenge.vercel.app/",
    description:
      "Star Wars Explorer es una Single Page Application (SPA) que te permite explorar el emocionante mundo de la saga Star Wars. Con esta aplicación, podrás consultar toda la información relacionada con tus personajes, naves, planetas y más, a través de una búsqueda por nombre fácil y rápida.",
    tecnologias:
      "Front: HTML, CSS, Javascript, React, Next.js , Redux-toolkit, MaterialUI,",
  },
  {
    title: "FullStore",
    img: fullstore,
    linkapp: "https://gernavarrete.github.io/fullstore.github.io",
    description:
      "Es una tienda online de aparatos de electrónica con el objetivo de poder encontrar precios actualizados de los últimos dispositivos del mercado y coordinar su compra con un vendedor personalizado",
    tecnologias: "Front: HTML, CSS, Javascript",
  },
];
