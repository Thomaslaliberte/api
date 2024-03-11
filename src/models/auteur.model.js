const sql = require("../config/pg_db.js");

const Auteur = (auteur) => {
    this.id = auteur.id;
    this.nom = auteur.nom;
};


Auteur.verifierAuteur = (auteur) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT nom FROM auteurs WHERE id = $1`;
        let params = [auteur];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat);
        });
    });
}
module.exports = Auteur