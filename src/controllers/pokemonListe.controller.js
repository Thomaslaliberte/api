const Pokemons = require("../model/pokemonListe.model.js");

exports.trouverLesPokemon= (req, res) => {


    // Appel à la fonction trouverUnProfesseur dans le modèle
    Pokemons.trouverLesPokemon(req.query.type_primaire)
    // Si c'est un succès
    .then((pokemons) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        console.log("resultat" , pokemons);
        if (!pokemons[0]) {
            res.status(404);
            res.send({
                message: `aucun pokemon trouvée`
            });
            return;
        }
        // Sinon on retourne le premier objet du tableau de résultat car on ne devrait avoir qu'un professeur par id
        if(req.query.page != null){
            res.send({pokemon : pokemons.slice(req.query.page*25 -25,req.query.page*25), type: req.query.type_primaire, nombreTotal: pokemons.length, page: req.query.page, nbPages : Math.ceil(pokemons.length/25)} );
        }
        else{
               res.send({pokemon : pokemons.slice(0,25), type: req.query.type_primaire, nombreTotal: pokemons.length, page: req.query.page, nbPages : Math.ceil(pokemons.length/25)} );

        }
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Erreur lors de la récupération des pokemon "
        });
    });
};