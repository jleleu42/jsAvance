// communication avec la base de données
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jsAvance');
var user = mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    admin: String
});
module.exports = mongoose.model('user', user);