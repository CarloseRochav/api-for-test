const {Socio} = require('../../models');


//Create socio
exports.postSocio = async (req,res)=>{

    const documento = req.body.documento;    
    const nombre = req.body.nombre;    
    const domicilio = req.body.domicilio;        

    console.log(req.body);

    try{

    const nuevoSocio ={
        documento:documento,
        nombre:nombre,
        domicilio:domicilio
    }

    await Socio.create(nuevoSocio);
    res.send({
        MSG:"Succesfully !"
    })

    }
    catch(error){
        res.send({
            msg:error
        })
    }

}

//Obtener Socios
exports.getSocios = async(req,res)=>{

    try{
    
        const Socios = await Socio.findAll();
    
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

