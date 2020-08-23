
const express = require("express");
const bodyParser = require('body-parser');
const routers = require('./routes/index');
const cors  = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',routers)
 

let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

app.get('/', function(req, res) {
    respuesta = {
     error: true,
     codigo: 200,
     mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
   });



app.use(function(req, res, next) {
    respuesta = {
        error: true, 
        codigo: 404, 
        mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});

app.listen(3001, () => {
    console.log("El servidor está inicializado en el puert 3001");
    // consulta();
  
});
   