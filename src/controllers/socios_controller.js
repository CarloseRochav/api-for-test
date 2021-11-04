const {Socio, Sequelize} = require('../../models');
const {sequelize} = require('../../models/'); //Forma correcta de llamar a la base de datos
const {db} = require('../../models/'); //Forma correcta de llamar a la base de datos
const { QueryTypes } = require('sequelize');




//Create socio
exports.postSocio = async (req,res)=>{

    const _documento = req.body.documento;    
    const _nombre = req.body.nombre;    
    const _domicilio = req.body.domicilio;        

    console.log(req.body);

    try{

    const nuevoSocio = await {
        documento:_documento,
        nombre:_nombre,
        domicilio:_domicilio
    }

    // await Socio.create(nuevoSocio);

    const socio = await sequelize.query('INSERT INTO Socios Values (:doc,:nom,:dom,:startAt,:upAt)', {
        replacements: 
        {
            doc:nuevoSocio.documento,
            nom:nuevoSocio.nombre,
            dom:nuevoSocio.domicilio,
            startAt:new Date(Date.now()).toISOString(),
            upAt:new Date(Date.now()).toISOString()
            // startAt:'2019-09-21',
            //upAt:'2019-09-21'
        },

        type: sequelize.QueryTypes.INSERT
      });
 
    res.send({
        MSG:"Succesfully !",
        Socio: nuevoSocio
    })

    }
    catch(error){
        console.log(`Ups un error ! : ${error}`)
        res.send({
            msg:`Error en : ${error}`
        })
    }

}

//Obtener Socios
exports.getSocios = async(req,res)=>{

    try{    
        const Socios = await Socio.findAll();

        //Usando Raw Querys
        
    
        // if (!Socio || !Socio.length) {
        
        //     throw console.log(404, "No hay usuarios en la base de datos.");
        // }      
        console.log(Socios);
        res.send(Socios);//Responde con la lista de socios 
        
    }
    catch(error){

            console.log(error);

            res.send({
                msg:`Error : ${error}`
            })
    }
}

