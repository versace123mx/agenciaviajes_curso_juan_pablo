import {Testimonial} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res)=>{
    const { nombre, correo, mensaje } = req.body;
    //console.log(req.body);
    const errores = [];
    if(nombre.trim() == ''){
        errores.push({mensaje: "el nombre esta vacio"});
    }
    if(correo.trim() == ''){
        errores.push({mensaje: "el correo esta vacio"});
    }
    if(mensaje.trim() == ''){
        errores.push({mensaje: "el mensaje esta vacio"});
    }

    //si hay errores mandamos el mensaje de error a pantalla
    if( errores.length ){

        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',
            {
                pagina: 'Testimoniales',
                errores,
                nombre,
                correo,
                mensaje,
                testimoniales
            }
        );
    }else{
        //Almacenamos los datos en la base de datos
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        }catch(error){
            console.log(error);
        }

    }
}

export {
    guardarTestimonial
}