const { Router } = require('express');
const express = require('express');
const Route = express.Router();

const { postSocio }= require('../controllers/socios_controller');


Route.post('/nuevo-socio',postSocio);


module.exports= Route;