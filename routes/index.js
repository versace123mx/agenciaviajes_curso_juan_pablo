import express from 'express'; //vercion de imports forma actual
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaSlug } from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();

//req lo que enviamos
//res lo que responde
//renderview para renderizar una vista
router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);


router.get('/viajes', paginaViajes);


router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales',guardarTestimonial);

router.get('/viajes/:slug', paginaSlug);



router.get('/culoncita', (req, res) =>{
    res.send('desde culoncita');
});
router.get('/inicio', (req, res) =>{
    res.render('inicio');
});

export default router;