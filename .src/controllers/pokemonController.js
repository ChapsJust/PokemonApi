
const pokemonModel = require('../models/pokemonModel');

const getPokemonById = async (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = await pokemonModel.getPokemonById(id);
    res.status(200).json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: `Echec lors de la récupération du pokemon avec l'id ${req.params.id}` });
  }
};

const getAllPokemons = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const type = req.query.type || '';
    const pokemons = await pokemonModel.getAllPokemons(page, type);
    res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: 'Echec lors de la récupération de la liste des pokemons' });
  }
};

const addPokemon = async (req, res) => {
  try {
    const newPokemon = req.body;
    const addedPokemon = await pokemonModel.addPokemon(newPokemon);
    res.status(201).json({ message: `Le pokemon ${addedPokemon.nom} a été ajouté avec succès`, pokemon: addedPokemon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: `Echec lors de la création du pokemon ${req.body.nom}` });
  }
};

const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPokemon = await pokemonModel.updatePokemon(id, req.body);
    res.status(200).json({ message: `Le pokemon id ${id} a été modifié avec succès`, pokemon: updatedPokemon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: `Echec lors de la modification du pokemon id ${req.params.id}` });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPokemon = await pokemonModel.deletePokemon(id);
    res.status(200).json({ message: `Le pokemon id ${id} a été supprimé avec succès`, pokemon: deletedPokemon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erreur: `Echec lors de la suppression du pokemon id ${req.params.id}` });
  }
};

module.exports = {
  getPokemonById,
  getAllPokemons,
  addPokemon,
  updatePokemon,
  deletePokemon,
};