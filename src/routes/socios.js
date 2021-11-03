const { Router } = require('express');
const express = require('express');
const Route = express.Router();

const { postSocio,getSocios }= require('../controllers/socios_controller');


Route.post('/nuevo-socio',postSocio);

Route.get('/todos-los-socios',getSocios);


module.exports= Route;