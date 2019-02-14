var express = require('express');
var router = express.Router();
const parser = require('body-parser');
const Utilisateur = require('./user_model');
const Conference = require('../conf/conf_model');
const Inscri = require('../conf/inscription_model')
var app = express();

// sinon ça marche pas -> en gros c'est pour etre capable d'utiliser le json dans le programme
app.use(parser.json());
app.use(router);


router.get('/:id', function (req, res, next) {
    Utilisateur.findById(req.params.id, function (err, us) {
        if (err) return handleError(err);

        Conference.find({}, function (error, co) {
            if (error) return handleError(error);
            
            tabFinal = [];
            tabInscrit = [];
            cpt = 0
            if (co.length == 0){
                res.render('user/dashboard', {
                    title: 'Vidéconf',
                    slogan: 'votre site web de vidéo conférence',
                    monNom: us.name,
                    monMail: us.mail,
                    monId: us.id,
                    monRang: us.admin,
                    tabFinal: tabFinal,
                    tabInscri: tabInscrit
                });
            }

            Object.keys(co).forEach(function (l) {

                enreg = {
                    "idConf": co[l]['id'],
                    "idUser": us.id
                };
                Inscri.findOne(enreg, function (err, element) {
                    if (element == null) {
                        tabInscrit.push(0); // si pas inscrit
                        tabFinal.push(co[l]);
                    } else {
                        tabInscrit.push(1); // si inscrit
                        tabFinal.push(co[l]);
                    }
                    cpt++;

                    if (co.length == cpt) {
                        res.render('user/dashboard', {
                            title: 'Vidéconf',
                            slogan: 'votre site web de vidéo conférence',
                            monNom: us.name,
                            monMail: us.mail,
                            monId: us.id,
                            monRang: us.admin,
                            tabFinal: tabFinal,
                            tabInscri: tabInscrit
                        });
                    }
                });
            });

        })
    })
});


module.exports = router;