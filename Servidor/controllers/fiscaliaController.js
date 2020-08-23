
const db = require('../models');
const {QueryTypes} = require('sequelize');

db.sequelize.authenticate().then(()=>{
    console.log("conectado a sql server");
}).catch((error)=>{
    console.log("error" + error);
})
 

let respuesta = {
    error: false,
    data : [],
    mensaje: ''
};
 

exports.DeleteFiscalia = async function(req, res){
    var resultado = await db.sequelize.query('exec DeleteFiscalia @Id = '+req.query.Id+';',{type : QueryTypes.DELETE});
    res.send({id: req.query.Id}); 
}

exports.UpdateFiscalia = async function(req,res){
    var resultado = await db.sequelize.query('exec UpdateFiscalia @Id = '+req.body.Id+' , @Ubicacion = \''+req.body.Ubicacion+'\', @Telefono = \''+req.body.Telefono+'\';',{type : QueryTypes.UPDATE});
    resultado = await db.sequelize.query('exec GetDato @Id ='+req.body.Id+' ;',{type : QueryTypes.SELECT}) ;
    res.send(resultado[0]); 
}

exports.SetFiscalia = async function(req, res){ 
    var resultado = await db.sequelize.query('exec InsertFiscalia @Ubicacion = \''+req.body.Ubicacion+'\', @Telefono = \''+req.body.Telefono+'\';',{type : QueryTypes.SELECT});
    resultado = await db.sequelize.query('exec GetDato @Id = '+resultado[0].ID,{type : QueryTypes.SELECT})
    res.send(resultado[0]); 
}

exports.GetFiscalias = async function(req, res){
    var usuarios = await db.sequelize.query('exec GetDatos;',{type : QueryTypes.SELECT}) ;
    res.send(usuarios); 
}

