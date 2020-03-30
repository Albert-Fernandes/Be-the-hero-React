/**modo de importat metodos e variaveis ou modulos */
const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();
const {errors} = require('celebrate');

app.use(cors());
app.use(express.json());
/**
 * tipos de parametros 
 * Query Params: Parametros nomeados enviados por rotas após "?" geralmente usdos para filtros e paginação 
 * Route Params: Parametro utilizado para identificar recursos;
 * Request Body : corpo da requisição utilizado para criar ou alterar recursos;
 * 
*/
/**utilizando variavel exportada */
app.use(routes);
app.use(errors())

module.exports = app;