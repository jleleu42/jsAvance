var express = require('express');
var router = express.Router();
const parser = require('body-parser');

const Utilisateur = require('./user_model')


var app = express();

// sinon ça marche pas -> en gros c'est pour etre capable d'utiliser le json dans le programme
app.use(parser.json());
app.use(router);


router.get('/', function (req, res, next) {
    res.render('user/inscription', { title: 'Vidéconf', slogan: 'votre site web de vidéo conférence' });
});



router.post('/', function (req, res, next) {

    console.log(req.body);
    Utilisateur.create(req.body, function (err, small) {
        if (err) return handleError(err);
    });

    res.writeHead(302, {
        'Location': '../'
    });
    res.end();
});

module.exports = router;
