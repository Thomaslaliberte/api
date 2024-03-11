const Citations = require("../models/citations.model.js");
const Auteur = require("../models/auteur.model.js");

exports.afficherCitations = (req, res) => {
    if (req.query.auteur) {
        Auteur.verifierAuteur(req.query.auteur)
            .then((reponse) => {
                // reponse[0].nom
                if (reponse != "") {
                    Citations.chercherCitationAuteur(req.query.auteur)
                        .then((reponseC) => {
                            res.send({ citation: reponseC[Math.floor(Math.random() * Object.keys(reponseC).length)].texte, auteur: reponse[0].nom });

                        })
                        .catch((erreur) => {
                            console.log('Erreur : ', erreur);
                            res.status(500)
                            res.send({
                                message: "Erreur lors de la récupération de la citation "
                            });
                        });
                }
                else {
                    res.send({
                        message: "l'auteur n'existe pas "
                    });
                }
            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500);
                res.send({
                    message: "Erreur lors de la récupération des auteurs "
                });
            })
    }
    else {
        Citations.chercherCitation()
            .then((reponse) => {
                res.send({ citation: reponse[Math.floor(Math.random() * Object.keys(reponse).length)].texte, auteur: reponse[0].nom });

            })
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "Erreur lors de la récupération de la citation "
                });
            });
    }
}

exports.modifier = (req, res) => {
    var message = 0;
    if (!req.body.texte) {
        message++;
    }
    if (!req.body.auteur_id) {
        message++;
    }
    if (message != 0) {
        res.status(400);
        res.send({
            erreur: "Vous devez fournir un texte et un auteur_id valide en format JSON dans le corps de la requête"
        });
        return;
    }
    Auteur.verifierAuteur(req.body.auteur_id)
        .then((reponse) => {
            if (reponse != "") {
                Citations.verifierCitation(req.params.id)
                .then((reponse) => {
                    if (reponse != "") {
                        Citations.modifier(req)
                        .then((reponse2) => {
                            Citations.citationComplette(req.params.id)
                            .then((reponse3) => {
                                res.send({ message : "la citation a ete modifier", citation : reponse3 });
                                
                            })
                            .catch((erreur) => {
                                console.log('Erreur : ', erreur);
                                res.status(500)
                                res.send({
                                    message: "Une erreur est survenue lors de la recherche de la citation "
                                });
                            });
                        })
                        .catch((erreur) => {
                            console.log('Erreur : ', erreur);
                            res.status(500)
                            res.send({
                                message: "Une erreur est survenue lors de la modification de la citation "
                            });
                        });
                    }
                    else {
                        res.status(404);
                        res.send({
                            erreur: "la citation n'existe pas"
                        });
                    }
                })
                .catch((erreur) => {
                    console.log('Erreur : ', erreur);
                    res.status(500)
                    res.send({
                        message: "Erreur lors de la récupération de la citation "
                    });
                });
            }
            else {
                res.status(404);
                res.send({
                    erreur: "l'auteur n'existe pas"
                });
            }
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Erreur lors de la récupération de l'auteur "
            });
        });
}

