const sql = require("../config/pg_db.js");

const Pokemons = (pokemons) => {
    this.nom = pokemons.nom;
    this.type_primaire = pokemons.type_primaire;
    this.type_secondaire = pokemons.type_secondaire;
    this.pv = pokemons.pv;
    this.attaque = pokemons.attaque;
    this.defense = pokemons.defense;
};

Pokemons.ajouterUnPokemon = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `INSERT INTO pokemon(nom, type_primaire, type_secondaire, pv, attaque, defense) value ($1,$2,$3,$4,$5,$6)`;
        let params = [req.body.nom, req.body.type_primaire, req.body.type_secondaire, req.body.pv, req.body.attaque, req.body.defense]
        
        

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
