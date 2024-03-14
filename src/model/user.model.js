const sql = require("../config/pg_db.js");
const bcrypt = require('bcrypt');
const costFactor = 10;
const uuidv4 = require('uuid');

const Users = (user) => {
    this.nom = user.nom;
    this.type_primaire = user.type_primaire;
    this.type_secondaire = user.type_secondaire;
    this.pv = user.pv;
    this.attaque = user.attaque;
    this.defense = user.defense;
};

Users.verifierUnUser = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT courriel FROM utilisateur WHERE courriel = $1`;
        let params = [req.body.courriel];
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

Users.ajouterUnUser = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.mot_de_passe, costFactor)
            .then(hash => {
                let myuuid = uuidv4.v4();
                let requete = `INSERT INTO utilisateur(nom, courriel, mot_de_passe, cle_api) value ($1,$2",$3,$4)`;    
                let params = [req.body.nom, req.body.courriel, hash, myuuid]
                sql.query(requete, params, (erreur, resultat) => {
                    if (erreur) {
                        // S'il y a une erreur, je la retourne avec reject()
                        reject(erreur);
                    }
                    // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
                    resolve("cle_api "+myuuid);
                });
            })
            .catch(err => reject(err))
        


        
    });
};

Users.validationCle = (cleApi) =>{
    return new Promise((resolve, reject) => {
        const requete = 'SELECT COUNT(*) AS nbUsager FROM utilisateur u WHERE cle_api = $1; ';
        const parametres = [cleApi];

        sql.query(requete, parametres, (erreur, resultat) => {
            if (erreur) {
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat[0].nbUsager > 0);   
        });
    });
}


Users.verifierCombinaison = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT mot_de_passe FROM utilisateur WHERE courriel = $1`;
        let params = [req.body.courriel];
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

Users.chercherCle = (req) => {
    return new Promise((resolve, reject) => {
        let requete = `SELECT cle_api FROM utilisateur WHERE courriel = $1`;
        let params = [req.body.courriel];
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

Users.creationCle = (req) => {
    return new Promise((resolve, reject) => {
        let myuuid = uuidv4.v4();
        let requete = `UPDATE utilisateur set cle_api = $1 WHERE courriel = $2`;
        let params = [myuuid,req.body.courriel];
        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            console.log(erreur);
            resolve(myuuid);
        });
    });
};
module.exports = Users;
