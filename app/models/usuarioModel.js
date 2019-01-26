var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({ 
    idUsuario: {type: String},
    nombreCliente: {type: String },
    nombreUsuario: { type: String },
    contrasenaUsuario: { type: String }
});

module.exports = mongoose.model('Usuario', usuarioSchema);