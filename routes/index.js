var express = require('express');
var router = express.Router();
var empresa = require("./controllers/empresa/index");
const fs = require('fs');
const trabajadores = require('./controllers/empresa/trabajadores');

const data = fs.readFileSync('./empresa.json', 'utf-8');
const empresas = JSON.parse(data);
const data1 = fs.readFileSync('./trabajadores.json', 'utf-8');
const trabajador = JSON.parse(data1);

var dato = new empresa();
var dato1 = new trabajadores();
/* GET home page. */
router.get('/empresas/asociadas', (req, res) => {
    res.json(empresas);
})

router.get('/empresas/asociadas/trabajadores/:nombreEmpresa', (req, res) => {
    let nombreEmpresa = req.params.nombreEmpresa;

    dato.empresaTrabajadores(nombreEmpresa,res);
    //dato.NumeroActual= t.length
   // res.status(200).json(t);
})


router.post('/empresa/nuevaEmpresa', (req, res, next) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    //  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
    console.log(req.session);
    dato.new(req, res);
});


router.put('/empresa/cambiarDatos/:id', (req, res) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    console.log(req.session);
    let id = req.params.id
    let params = { nombreEmpresa, codigo, area } = req.body;
    dato.cambiar(id, params);
    res.status(200).send("Cambio realizado exitosamente");
})

router.delete('/empresa/eliminar/:id', (req, res) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    console.log(req.session);
    let id = req.params.id;
    dato.eliminar(id);
    res.status(200).send("Empresa eliminada con exito");
})
router.post('/trabajador/nuevoTrabajador', (req, res, next) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    console.log(req.session);
    dato1.new(req, res);
})

router.put('/trabajador/cambiarDatos/:id', (req, res) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    console.log(req.session);
    let id = req.params.id;
    let params = { nombreTrabajador, grado, codigo, sexo, descripcion, calificacion, empleo } = req.body;
    dato1.cambiar(id, params);
    res.status(200).send("Cambio realizado exitosamente");
})

router.delete('/trabajador/eliminar/:id', (req, res) => {
    req.session.usuario = 'Luis Paredes';
    req.session.rol = 'Admin';
    console.log(req.session);
    let id = req.params.id;
    dato1.eliminar(id);
    res.status(200).send("Trabajador eliminado exitosamente")
})

router.post('/:case/solicitud',(req,res)=>{
    switch(req.params.case){
        case "empresa":
            dato.solicitud(req,res);
            res.send("Solicitud realizada con exito");
            break;
        case "trabajador":
            dato1.solicitud(req,res);
            res.send("Solicitud realizada con exito");
            break;
        default:
            res.send("Esta ruta no existe");

    }
   // dato.solicitud(req,res);
})

router.get('/empresa/mostrar', (req,res)=>{
            dato.viewSolicitud(req,res);

    
})

router.get('/trabajador/mejor',(req,res)=>{
    const valor= {cargo, sueldo, calificacion, grado}= req.query
   /* if(valor.cargo== 'gerente de sistemas'){
        console.log("Holis");
    }*/
    dato.mejorOpcion(valor,req,res);
})

/*router.post('/trabajador/solicitud',(req,res)=>{
    dato1.solicitud(req,res);
})*/

module.exports = router;
