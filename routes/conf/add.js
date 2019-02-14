var express = require('express');
var router = express.Router();
const parser = require('body-parser');
const Utilisateur = require('../user/user_model');
const Conference = require('./conf_model');
var app = express();

// sinon ça marche pas -> en gros c'est pour etre capable d'utiliser le json dans le programme
app.use(parser.json());
app.use(router);


router.get('/:id', function (req, res, next) {
    Utilisateur.findById(req.params.id, function (err, element) {
        if (err) return handleError(err);
        res.render('conf/add', { 
            title: 'Vidéconf',
            slogan: 'votre site web de vidéo conférence',
            monNom: element.name,
            monMail: element.mail,
            monId: element.id
        });
    })
});

router.post('/:id', function (req, res, next) {
    Conference.create(req.body, function (err, small) {
        if (err) return handleError(err);
    });

    res.writeHead(302, {
        'Location': '/user/dashboard/' + req.params.id       // TODO : améliorer la sécurité :O
    });
    res.end();
});


module.exports = router;