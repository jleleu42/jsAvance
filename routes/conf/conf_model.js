// communication avec la base de données
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jsAvance');
var conf = mongoose.Schema({
    name: String,
    desc: String,
    createur: String,
    dated: String,
    heured: String,
    heuref: String
});
module.exports = mongoose.model('conf', conf);