var express = require('express');
var router = express.Router();
const parser = require('body-parser');
const Utilisateur = require('../user/user_model');
const Conference = require('../conf/conf_model');
const Inscri = require('../conf/inscription_model')
var app = express();

// sinon ça marche pas -> en gros c'est pour etre capable d'utiliser le json dans le programme
app.use(parser.json());
app.use(router);


router.get('/:id', function (req, res, next) {
    Utilisateur.find({ _id: { $nin: req.params.id } }, function (err, us) {
        if (err) return handleError(err);
        res.render('chat/choixuser', {
            title: 'Vidéconf',
            slogan: 'votre site web de vidéo conférence',
            tabFinal: us,
            moi: req.params.id
        });
    });
});


module.exports = router;