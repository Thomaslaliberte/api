const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();  
const pokemonController = require('../../controllers/pokemon.controller');
const pokemonsControleur = require('../../controllers/pokemonListe.controller');
const ajouterPokemonControleur = require('../../controllers/ajouterPokemon.controller');


router.get('/liste', (req, res) => {
    pokemonsControleur.trouverLesPokemon(req, res)
});
router.get('/:id', (req, res) => {
    pokemonController.trouverUnPokemon(req, res);
});
router.put('/:id', (req, res) => {
    pokemonController.modifierUnPokemon(req, res);
});
router.delete('/:id', (req, res) => {
    pokemonController.supprimerUnPokemon(req, res);
});

router.post('/', (req, res) => {
    ajouterPokemonControleur.ajouterUnPokemon(req, res);
});



module.exports = router;