const { Router } = require('express');
const express = require('express');
const Route = express.Router();

const { postSocio,getSocios }= require('../controllers/socios_controller');
const {createPrueba}=require('../controllers/pruebas_controller')


Route
.post('/nuevo-socio',postSocio);

Route
.get('/todos-los-socios',getSocios);

Route
.post('/prueba',createPrueba);


module.exports= Route;