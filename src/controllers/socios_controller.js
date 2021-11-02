const Socio = require('../../models/socio');


//Create socio
exports.postSocio = async (req,res)=>{

    const documento = req.body.documento;    
    const nombre = req.body.nombre;    
    const domicilio = req.body.domicilio;    

    console.log(req.body);

    const nuevoSocio ={
        documento:documento,
        nombre:nombre,
        domicilio:domicilio
    }

    await Socio.create(nuevoSocio);

}

//Obtener Socios
exports.getSocios = async()=>{

    await Socio.findAll();
    if (!Socio || !Socio.length) {
        throw customError(404, "No hay usuarios en la base de datos.");
      }
      return Socio;
}

