const express = require('express');
//const app = express();//Solo para servidor

const router=express.Router();//Enrutador


router.get('/hola',()=>{
    console.log("Bienvenido a la ruta /hola")
})

router.get('bienvenido',()=>{
    console.log("Bienvenidos sean todos a la api")
})


module.exports=router; //Exportacion de router --con rutas