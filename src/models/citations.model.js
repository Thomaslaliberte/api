const sql = require("../config/db.js");

const Citations = (citation) => {
    this.id = citation.id;
    this.texte = citation.texte;
    this.auteur = citation.auteur;
};

Citations.chercherCitationAuteur = (id) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT texte FROM citations WHERE auteurs_id = $1`;
        let params = [id];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};

Citations.chercherCitation=() =>{
    return new Promise((resolve, reject) => {
        let requete = `SELECT texte FROM citations`;
        sql.query(requete, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}

Citations.verifierCitation = (id) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT texte FROM citations WHERE id = ?`;
        let params = [id];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}

Citations.modifier = (req)=>{
    return new Promise((resolve, reject) => {
        let requete = `UPDATE citations SET texte = $1, auteurs_id = $2 WHERE id = $3`;
        let params = [req.body.texte, req.body.auteur_id, req.params.id];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}

Citations.citationComplette=(id)=>{
    return new Promise((resolve, reject) => {
        let requete = `SELECT * FROM citations WHERE id = $1`;
        let params = [id];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
}
module.exports = Citations
