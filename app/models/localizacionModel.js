var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localizacionSchema = new Schema({ 
    nombreUsuario: {
        type: String, 
        index: true
    },
    latitud: {
        type: String, 
        required: true 
    },
    longitud: { 
        type: String, 
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    }
},{collection: "location" });

module.exports = mongoose.model('Localizacion', localizacionSchema);
module.exports.addLocation = function (location, callback) {
    location.save(callback);
}