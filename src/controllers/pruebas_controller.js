'use strict'
const {prueba}=require('../../models')

exports.createPrueba =async (req,res)=>{
    
    const _descripcion = req.body.descripcion;
    console.log(_descripcion);

    try{

    
    const registro = await prueba.create({
        descripcion:_descripcion
    })

    res.send(registro);
    }
    catch(error){
        res.send({
            msg:`Error : ${error}`
        })
    }

}