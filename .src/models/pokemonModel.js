const mysql = require('mysql');
const dotenv = require('dotenv');
const pool = require("../config/db");

const getPokemonById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM pokemon WHERE id = ?`;
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        reject({ status: 404, message: `Le pokemon id ${id} n'existe pas dans la base de données` });
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getAllPokemons = (page, type) => {
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM pokemon';
    const limit = 25;
    const offset = (page - 1) * limit;
    const params = [];

    if (type) {
      query += ' WHERE type_primaire = ?';
      params.push(type);
    }

    query += ` LIMIT ${limit} OFFSET ${offset}`;

    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        let countQuery = 'SELECT COUNT(*) as total FROM pokemon';
        if (type) {
          countQuery += ' WHERE type_primaire = ?';
        }
        pool.query(countQuery, params, (countError, countResults) => {
          if (countError) {
            reject(countError);
          } else {
            const totalPokemonCount = countResults[0] ? countResults[0].total : 0;
            const totalPages = Math.ceil(totalPokemonCount / limit);
            resolve({ pokemons: results, type, nombrePokemonTotal: totalPokemonCount, page, totalPage: totalPages });
          }
        });
      }
    });
  });
};

const addPokemon = (newPokemon) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pokemon SET ?';
    pool.query(query, newPokemon, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const insertedId = results.insertId;
        resolve({ id: insertedId, ...newPokemon });
      }
    });
  });
};

const updatePokemon = (id, updatedPokemon) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE pokemon SET ? WHERE id = ?';
    pool.query(query, [updatedPokemon, id], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.affectedRows === 0) {
        reject({ status: 404, message: `Le pokemon id ${id} n'existe pas dans la base de données` });
      } else {
        resolve({ id, ...updatedPokemon });
      }
    });
  });
};

const deletePokemon = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM pokemon WHERE id = ?';
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.affectedRows === 0) {
        reject({ status: 404, message: `Le pokemon id ${id} n'existe pas dans la base de données` });
      } else {
        resolve({ id, ...results });
      }
    });
  });
};

module.exports = {
  getPokemonById,
  getAllPokemons,
  addPokemon,
  updatePokemon,
  deletePokemon,
};