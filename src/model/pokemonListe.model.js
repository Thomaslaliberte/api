const sql = require("../config/pg_db.js");

const Pokemons = (pokemons) => {
    this.nom = pokemons.nom;
    this.type_primaire = pokemons.type_primaire;
    this.type_secondaire = pokemons.type_secondaire;
    this.pv = pokemons.pv;
    this.attaque = pokemons.attaque;
    this.defense = pokemons.defense;
};

Pokemons.trouverLesPokemon = (type_primaire) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT id, nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon`;
        let params = []
        if (type_primaire != null){
            requete = `SELECT id, nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE type_primaire = $1`;
            params = [type_primaire];
        }

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
