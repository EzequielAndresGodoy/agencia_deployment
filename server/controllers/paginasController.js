import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js'

const paginaInicio = async (req, res) => { // req - lo que enviamos | res - lo que express nos responde
  
    //Consultar 3 viajes del modelo viaje

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit: 3}) );
    promiseDB.push( Testimonial.findAll({limit: 3}) );
    console.log(promiseDB)
    try {
        const resultado = await Promise.all( promiseDB );

        res.render('../server/views/inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
          });

    } catch (error) {
        console.error(error);
    }
    
};

const paginaNosotros = (req, res) => {
  res.render('../server/views/nosotros', {
    pagina: 'Nosotros'
  });
};

const paginaViajes = async (req, res) => {
  //consultar db
  const viajes = await Viaje.findAll();

  res.render('../server/views/viajes', {
    pagina: 'Proximos Viajes', 
    viajes
  });
};

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('../server/views/testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
          });
    } catch (error) {
        console.error(error)
    }
  
};

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        res.render('../server/views/viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.error(error);
    };
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}