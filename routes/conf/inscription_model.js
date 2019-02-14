// communication avec la base de données
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jsAvance');
var inscri = mongoose.Schema({
    idConf: String,
    idUser: String
});
module.exports = mongoose.model('inscri', inscri);