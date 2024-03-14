const Pokemon = require("../model/ajouterpokemon.model.js");

exports.ajouterUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    console.log(req.body)
    var message = [];
    if(!req.body.nom){
        message.push("nom");
    }
    if(!req.body.type_primaire){
        message.push("type_primaire") ;
    }
    if(!req.body.type_secondaire){
        message.push("type_secondaire");
    }
    if(!req.body.pv){
        message.push("pv");
    }
    if(!req.body.attaque){
        message.push("attaque");
    }
    if(!req.body.defense){
        message.push("defense");
    }
    if(message[0] != null){
        res.status(400);
        res.send({
            erreur: "message",
            champ_manquant:  message
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemon.ajouterUnUser(req)
    // Si c'est un succès
    .then((pokemon) => {
        
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
            res.send({ message: "Le pokemon " +[req.body.nom]+ " a été ajouté avec succès", pokemon: {id: pokemon.insertId,nom:req.body.nom, type_primaire: req.body.type_primaire, type_secondaire: req.body.type_secondaire, pv: req.body.pv, attaque: req.body.attaque, defense: req.body.defense  }})
        })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "echec lor de la creation de "+ [req.body.nom]
        });
    });
};

