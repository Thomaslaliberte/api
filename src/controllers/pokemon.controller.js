const Pokemon = require("../model/pokemon.model.js");

exports.trouverUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    if(!req.params.id || parseInt(req.params.id) <= 0){
        res.status(400);
        res.send({
            message: "L'id du pokemon est obligatoire et doit être supérieur à 0"
        });
        return;
    }

    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemon.trouverUnPokemon(req.params.id)
    // Si c'est un succès
    .then((pokemon) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!pokemon[0]) {
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
        res.send(pokemon[0]);
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération du pokemon"
        });
    });
};

exports.modifierUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    console.log(req.body)
    var message = "";
    if(!req.body.nom){
        message += "nom\r\n";
    }
    if(!req.body.type_primaire){
        message += "type_primaire\r\n";
    }
    if(!req.body.type_secondaire){
        message += "type_secondaire\r\n";
    }
    if(!req.body.pv){
        message += "pv\r\n";
    }
    if(!req.body.attaque){
        message += "attaque\r\n";
    }
    if(!req.body.defense){
        message += "defense\r\n";
    }
    if(message != ""){
        res.status(400);
        res.send({
            champ_manquant:  message
        });
        return;
    }
    Pokemon.verifierUnPokemon(req)
    .then((valeur)=>{
        if (valeur != ""){
            // Appel à la fonction trouverUnProfesseur dans le modèle
            Pokemon.modifierUnPokemon(req)
            // Si c'est un succès
            .then((pokemon) => {
                
                // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                    res.send({ message: "Le pokemon " +[req.params.id]+ " a été modifier avec succès", pokemon: {id: req.params.id,nom:req.body.nom, type_primaire: req.body.type_primaire, type_secondaire: req.body.type_secondaire, pv: req.body.pv, attaque: req.body.attaque, defense: req.body.defense  }})
                })
            // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "echec lors de la modification de "+ [req.params.id]
                });
            });
        }
        else{
            res.status(404)
            res.send({
            message: "le pokemon "+ [req.params.id] + " n'existe pas"
        });
        }
        
    
    })
    .catch((erreur) =>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "echec lors de la modification de "+ [req.params.id]
        });
    });
};

exports.supprimerUnPokemon = (req, res) => {
    // Teste si le paramètre id est présent et valide
    Pokemon.verifierUnPokemon(req)
    .then((valeur)=>{
        if (valeur[0].id == req.params.id){
            // Appel à la fonction trouverUnProfesseur dans le modèle
            Pokemon.supprimerUnPokemon(req)
            // Si c'est un succès
            .then((pokemon) => {
                
                // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
                    res.send({ message: "Le pokemon " +[req.params.id]+ " a été supprimer avec succès", pokemon: {id: req.params.id, pokemon: pokemon  }})
                })
            // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
            .catch((erreur) => {
                console.log('Erreur : ', erreur);
                res.status(500)
                res.send({
                    message: "echec lors de la suppression de "+ [req.params.id]
                });
            });
        }
        else{
            res.status(404)
            res.send({
            message: "le pokemon "+ [req.params.id] + " n'existe pas"
        });
        }
        
    
    })
    .catch((erreur) =>{
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "echec lors de la suppression de "+ [req.params.id]
        });
    });
};