var express = require('express');
var router = express.Router();
const parser = require('body-parser');
const Utilisateur = require('../user/user_model');
const Conference = require('./conf_model');
const Inscri = require('./inscription_model')
var app = express();

// sinon ça marche pas -> en gros c'est pour etre capable d'utiliser le json dans le programme
app.use(parser.json());
app.use(router);


router.get('/', function (req, res, next) {
    console.log(req.query.idUser);
    console.log(req.query.idConf);

    enreg = {
        "idConf": req.query.idConf,
        "idUser": req.query.idUser
    };

    console.log(enreg);

    Inscri.create(enreg, function (err, small) {
        if (err) return handleError(err);
    });
    res.writeHead(302, {
        'Location': '../user/dashboard/' + req.query.idUser       // TODO : améliorer la sécurité :O
    });
    res.end();

});


module.exports = router;