const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router(); 
const Citations = require('../../controllers/citations.controller');

router.get('/aleatoire', (req, res)=>{
    Citations.afficherCitations(req, res);
});

router.put('/:id', (req, res)=>{
    Citations.modifier(req, res);
});


module.exports = router;