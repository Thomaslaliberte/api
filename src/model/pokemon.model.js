const sql = require("../config/pg_db.js");


const Pokemons = (pokemon) => {
    this.nom = pokemon.nom;
    this.type_primaire = pokemon.type_primaire;
    this.type_secondaire = pokemon.type_secondaire;
    this.pv = pokemon.pv;
    this.attaque = pokemon.attaque;
    this.defense = pokemon.defense;
};

Pokemons.trouverUnPokemon = (id) => {
    return new Promise((resolve, reject) => {

        const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = $1`;
        const params = [id];

        sql.query(requete, params, (erreur, resultat) => {
            console.log(erreur);
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};

Pokemons.modifierUnPokemon = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `update pokemon set nom = $1, type_primaire = $2, type_secondaire = $3, pv = $4, attaque = $5, defense = $6 where id = $7`;
        let params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense, req.params.id]
        
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};



Pokemons.verifierUnPokemon = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT id FROM pokemon WHERE id = $1`;
        let params = [req.params.id]
        
        

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat.rows);
        });
    });
};



Pokemons.supprimerUnPokemon = (req) => {
    return new Promise((resolve, reject) => {
        
            let requete = `DELETE FROM pokemon where id = $1`;
            let params = [req.params.id]
        
        

            sql.query(requete, params, (erreur, resultat) => {
                if (erreur) {
                    // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
                }
                // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                resolve(resultat.rows);
            });
    });
};
module.exports = Pokemons;