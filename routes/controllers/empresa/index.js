const res = require('express/lib/response');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');



class empresa {
    constructor(req, res) {

    }

    new(req, res) {
        const data = fs.readFileSync('./empresa.json', 'utf-8');

        let empresas = JSON.parse(data);
        const { nombreEmpresa, codigo, area, id_key } = req.body;
        //console.log(req.body);
        if (typeof nombreEmpresa !== 'undefined' && typeof codigo !== 'undefined' && typeof area !== 'undefined' && typeof id_key !== 'undefined') {
            this.nombreEmpresa = nombreEmpresa;
            this.codigo = codigo;
            this.area = area;
            this.id_key = id_key;


            let nuevaEmpresa = {
                id: uuidv4(),
                nombreEmpresa,
                codigo,
                area,
                id_key
            }
            empresas.push(nuevaEmpresa);
            // console.log(nuevaEmpresa)
            const str = JSON.stringify(empresas);
            fs.writeFileSync('empresa.json', str, 'utf-8');

            res.send("Nueva Empresa registrada");
        } else {
            res.send("Falta por llenar algun campo");
        }
    }


    empresaTrabajadores(nombreEmpresa, res) {
        const data = fs.readFileSync('./empresa.json', 'utf-8');
        const empresas = JSON.parse(data);
        const data1 = fs.readFileSync('./trabajadores.json', 'utf-8');
        const trabajador = JSON.parse(data1);

        let t = [];
        for (let i = 0; i < empresas.length; i++) {
            if (nombreEmpresa == empresas[i].nombreEmpresa) {
                console.log('mismo nombre');
                let id_key = empresas[i].id_key;
                for (let j = 0; j < trabajador.length; j++) {
                    if (id_key == trabajador[j].id_key) {
                        t.push(trabajador[j]);
                    }
                }
            }
        }
        res.status(200).json(t);

    }


    cambiar(id, params) {
        //  let id = req.params.id
        const data = fs.readFileSync('./empresa.json', 'utf-8');
        const empresas = JSON.parse(data);

        //console.log(params)
        // let params = { nombreEmpresa, codigo, area, numeroMax, numeroActual } = req.body;



        for (let i = 0; i < empresas.length; i++) {
            if (id == empresas[i].id) {
                console.log('id lo mismo');
                for (let key in params) {
                    if (empresas[i][key]) {
                        empresas[i][key] = params[key];
                    }
                }
            } else {
                //return res.status(400).send("Id no existe")
            }
        }
        const str = JSON.stringify(empresas);
        console.log(str);

        //luego escribimos los datos aqui
        fs.writeFileSync('empresa.json', str, 'utf-8')
        //  res.status(200).send("Datos de la empresa actualizados correctamente");

    }

    eliminar(id) {
        const data = fs.readFileSync('./empresa.json', 'utf-8');
        const empresas = JSON.parse(data);
        // console.log(data);
        //leemos los datos para eliminar
        for (let i = 0; i < empresas.length; i++) {
            if (id == empresas[i].id) {

                // console.log(empresas[i].id)
                empresas.splice(i, 1);
            } else {
                //res.status(400).send("Este id no existe")
            }
        }
        const str = JSON.stringify(empresas);
        fs.writeFileSync('empresa.json', str, 'utf-8')

    }

    solicitud(req, res) {
        const data = fs.readFileSync('./solicitudesEmpresa.json', 'utf-8');
        const solicitudes = JSON.parse(data);
        let e= solicitudes.length;
        const {nombreEmpresa, cargo, sueldo, calificacion, grado } = req.body;
        if (typeof nombreEmpresa !== 'undefined'&& typeof cargo !== 'undefined' && typeof sueldo !== 'undefined' && typeof calificacion !== 'undefined' && typeof grado !== 'undefined') {
            this.nombreEmpresa= nombreEmpresa;
            this.cargo = cargo
            this.sueldo = sueldo
            this.calificacion
            this.grado = grado
        }
        let nuevaSolicitud = {
            id:e,
            nombreEmpresa,
            cargo,
            sueldo,
            calificacion,
            grado
        }
        solicitudes.push(nuevaSolicitud);
        const str = JSON.stringify(solicitudes);
        fs.writeFileSync('solicitudesEmpresa.json', str, 'utf-8');
    }

    viewSolicitud(req,res){
        const data = fs.readFileSync('./solicitudesEmpresa.json', 'utf-8');
        const solicitudes = JSON.parse(data);

        const data1= fs.readFileSync('./empresa.json','utf-8');
        const empresas= JSON.parse(data1);

        let t=[];
      //  let a= [];

        for (let i = 0; i < solicitudes.length; i++) {
            for (let j=0;j< empresas.length;j++){
                if (solicitudes[i].nombreEmpresa == empresas[j].nombreEmpresa) {
                    let a=[];
                    a.push(solicitudes[i])
                    empresas[j].solicitudes=a;

                  //  console.log('id lo mismo');
                  t.push(empresas[j]);                
                }
            }
        }
      //  empresas[j].solicitud=a;
        

        res.json({"empresas con solicitudes":t })
    }

    mejorOpcion(valor,req,res){
        const data = fs.readFileSync('./solicitudesEmpresa.json', 'utf-8');
        const solicitudes = JSON.parse(data);

        const data1= fs.readFileSync('./solicitudesTrabajador.json','utf-8');
        const solicitudes1= JSON.parse(data1);

        console.log("Aqui estoy");

        for(let i=0;i<solicitudes1.length;i++){
            if(valor.cargo == solicitudes1[i].cargo && valor.sueldo> solicitudes1[i].sueldo && valor.calificacion<= solicitudes1[i].calificacion &&valor.grado == solicitudes1[i].grado){
                res.json(solicitudes1[i]);
                console.log(solicitudes1[i]);
            }else{
               // res.status(400).send("No se encontro ninguna solicitud de trabajador que cumpla con los requisitos");
            }
        }

        
    }


}


module.exports = empresa;