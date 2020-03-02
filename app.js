/*
Insertar datos a oracle desde nodejs
*/
var express = require("express");
var app = express();
var bodyparser=require('body-parser');
var methodOverride = require("method-override");
var dao = require("./dao");

//Authorizar todas las solicitudes de cors)
var cors = require('cors');
app.use(cors());

//permitir conexion// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

///Para cambiar el formato de la solicitud 
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());
app.use(methodOverride());

var router = express.Router();
router.get('/productos', function(request, response){
    var opc =parseInt(request.query.opc);
    switch (opc){
        case 1:            
            sql = "SELECT * FROM PRODUCTOS";
            dao.open(sql,[],false,response);
            console.log('En case 1 de app.js:');
            break;
        
        case 2: 
            sql = "SELECT * FROM USUARIOS WHERE usunombre=:usunombre AND usucontrasena=:usucontrasena";
            var usunombre = request.query.usunombre;
            var usucontrasena = request.query.usucontrasena;
            dao.open(sql,[usunombre,usucontrasena], false, response);
            break;
        case 4: 
            sql = "SELECT * FROM TIPOS";            
            dao.open(sql,[], false, response);
            console.log('En case 4 de GET de app.js:');
            break;
        
        default:
            response.contentType('application/json').status(200);
            response.send(JSON.stringify('Opcion no valida en get.'));
    }
    response.end;
});


/*******/

router.post('/productos', function(request, response){
    var opc =parseInt(request.query.opc);
    switch (opc){
        
        
        case 3:
            sql = "INSERT INTO PRODUCTOS(pronombre,proprecio,procantidad,tipid,usuid)" +
                    "VALUES (:pronombre,:proprecio,:procantidad,:tipid,:usuid)";
            var pronombre = request.query.pronombre;
            var proprecio = request.query.proprecio;
            var procantidad = request.query.procantidad;
            var tipid = parseFloat(request.query.tipid);
            //var tipid = request.query.tipid;
            //var usuid = request.query.usuid;
            var usuid = parseFloat(request.query.usuid);
            console.log('En case 3 de POST de app.js: usuid='+usuid);
            dao.open(sql,[pronombre,proprecio,procantidad,tipid,usuid], true,response);
            break;
        default:
            response.contentType('application/json').status(200);
            response.send(JSON.stringify('Opcion no valida en post.'));
    }
    response.end;
});

/*******/

router.delete('/producto', function(request, response){
    var opc =parseInt(request.query.opc);
    switch (opc){        
        case 5:
            sql = "DELETE FROM PRODUCTOS WHERE proid=:proid";
            var proid = parseFloat(request.query.proid);
            console.log('vr id en delete:'+proid);
            dao.open(sql,[proid],true,response);
            break;
        default:
            response.contentType('application/json').status(200);
            response.send(JSON.stringify('Opcion no valida en delete.'));
    }
    response.end;
});


app.use(router);

app.listen(3100, function(){
    console.log("Servidor Web - Http:/localhost:3100");
});