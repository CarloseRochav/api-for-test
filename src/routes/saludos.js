const express = require('express');
//const app = express();//Solo para servidor

const router=express.Router();//Enrutador


router.get('/hola',()=>{
    console.log("Bienvenido a la ruta /hola")
})


module.exports=router; //Exportancion de router --con rutas