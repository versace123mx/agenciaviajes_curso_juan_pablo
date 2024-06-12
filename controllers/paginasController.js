import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";
import moment from 'moment/moment.js';

const paginaInicio = async (req, res) => {

    //Esto se realizo con la finalidad de poder tener las dos consultas, ya que si las dos llevara el await se espera una a que la otra entregue y de esta forma almacenamos la consulta en el arreglo y luego le aplicamos el await a las dos en conjunto cuando ya se tenga el resultado de ambas
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    //Esta es otra forma de acerlo pero a mi me gusta la de[] ya que asi entiendo que me devuelve un array de objetos
    // const [viajes, testimoniales] = await Promise.all([
    //     Viajes.findAll({ limit: 3 }),
    //     Testimoniales.findAll({ limit: 3 })
    //   ])
    try {
        const resultado = await Promise.all(promiseDB);
        console.log(resultado);
        res.render('inicio',{
            pagina: 'Inicio2',
            clase: 'home',
            viajes: resultado[0],
            moment,
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) =>{
    //const viajes = 'Viaje a Alemania';
    res.render('nosotros',
        {
            pagina: 'Nosotros'
        }
    );
}

const paginaViajes = async (req, res) =>{

    //Consultar base de datos
    const viajes = await Viaje.findAll();

    //console.log('Mis viajes',viajes);

    res.render('viajes',{
        pagina: 'Proximos Viajes',
        viajes,
        moment
    });
}


const paginaTestimoniales = async (req, res) =>{

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su slug
const paginaSlug = async (req, res) =>{
    const { slug } = req.params;

    try{
        const respuesta = await Viaje.findOne({ where: { slug } });
        res.render('viaje',{
            pagina: slug,
            viaje: respuesta,
            moment
        });
    }catch(error){
        console.log(error)
    }
    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaSlug
}