const mysql = require('mysql');
const dotenv = require('dotenv');
const pool = require("../config/db");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const ajouterUtilisateur = (nom, courriel, mot_de_passe) => {
    return new Promise((resolve, reject ) => {

    const cle_api = uuidv4();
    
    const query = `INSERT INTO utilisateurs (nom, courriel, mot_de_passe, cle_api) VALUES (?, ?, ?, ?)`;
    pool.query(query, [nom, courriel, mot_de_passe, cle_api], (error, results) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(true);
        }
    });
    });
};

const validerCourriel = (courriel) => {
    return new Promise((resolve, reject) => {
        const query = `Select count(*) FROM utilisateurs WHERE courriel = ?`;
        pool.query(query, [courriel], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results[0] > 0);
            }
        });
    });
};

module.exports = {
    ajouterUtilisateur,
    validerCourriel
};