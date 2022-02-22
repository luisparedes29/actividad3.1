const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { set } = require('../../../app');
const empresa = require('./index');

class trabajadores extends empresa {
    constructor(req,res) {
        super(req, res);
    };

    new(req, res) {
        const data = fs.readFileSync('./trabajadores.json', 'utf-8');

        let trabajador = JSON.parse(data);
        const { nombreTrabajador, grado, codigo, sexo, descripcion, calificacion, empleo, id_key } = req.body;
        //console.log(req.body);
        if (typeof nombreTrabajador !== 'undefined' && typeof codigo !== 'undefined' && typeof grado !== 'undefined' && typeof sexo !== 'undefined' && typeof descripcion !== 'undefined' && typeof calificacion !== 'undefined' && typeof empleo !== 'undefined') {
            this.nombreTrabajador = nombreTrabajador;
            this.grado = grado;
            this.codigo = codigo;
            this.sexo = sexo;
            this.descripcion = descripcion;
            this.calificacion= calificacion;
            this.empleo= empleo;
            this.id_key= id_key

            let nuevoTrabajador = {
                id: uuidv4(),
                nombreTrabajador,
                grado,
                codigo,
                sexo,
                descripcion,
                calificacion,
                empleo,
                id_key
            }
            trabajador.push(nuevoTrabajador);
            // console.log(nuevaEmpresa)
            const str = JSON.stringify(trabajador);
            fs.writeFileSync('trabajadores.json', str, 'utf-8');

            res.send("Nuevo trabajador registrado");
        } else {
            res.send("Falta por llenar algun campo");
        }
    }

    set Id_key(valor){
        this.id_key=valor;
    }

    cambiar(id,params){
        const data = fs.readFileSync('./trabajadores.json', 'utf-8');
        const trabajador = JSON.parse(data);

        //console.log(params)
        // let params = { nombreEmpresa, codigo, area, numeroMax, numeroActual } = req.body;



        for (let i = 0; i < trabajador.length; i++) {
            if (id == trabajador[i].id) {
                console.log('id lo mismo');
                for (let key in params) {
                    if (trabajador[i][key]) {
                        trabajador[i][key] = params[key];
                    }
                }
            } else {
                //return res.status(400).send("Id no existe")
            }
        }
        const str = JSON.stringify(trabajador);
       // console.log(str);

        //luego escribimos los datos aqui
        fs.writeFileSync('trabajadores.json', str, 'utf-8')

    }

    eliminar(id){
      //  console.log(" aqui estaa")
        const data = fs.readFileSync('./trabajadores.json', 'utf-8');
        const trabajador = JSON.parse(data);
      //  console.log(data);
        //leemos los datos para eliminar
        for (let i = 0; i < trabajador.length; i++) {
            if (id == trabajador[i].id) {

               // console.log(empresas[i].id)
                trabajador.splice(i, 1);
            } else {
                //res.status(400).send("Este id no existe")
            }
        }
        const str = JSON.stringify(trabajador);
        fs.writeFileSync('trabajadores.json', str, 'utf-8')

    }

    solicitud(req,res){
        const data = fs.readFileSync('./solicitudesTrabajador.json', 'utf-8');
        const solicitudes = JSON.parse(data);
        const {nombreTrabajador ,cargo, sueldo, calificacion, grado } = req.body;
        let e= solicitudes.length;
        if (typeof nombreTrabajador !== 'undefined' && typeof cargo !== 'undefined' && typeof sueldo !== 'undefined' && typeof calificacion !== 'undefined' && typeof grado !== 'undefined') {
            this.nombreTrabajador=nombreTrabajador;
            this.cargo = cargo;
            this.sueldo = sueldo;
            this.calificacion= calificacion;
            this.grado = grado;
        }
        let nuevaSolicitud = {
            id:e,
            nombreTrabajador,
            cargo,
            sueldo,
            calificacion,
            grado
        }
        solicitudes.push(nuevaSolicitud);
        const str = JSON.stringify(solicitudes);
        fs.writeFileSync('solicitudesTrabajador.json', str, 'utf-8');
    }

}

module.exports = trabajadores;