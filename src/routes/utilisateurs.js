const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateursController');

router.post('/ajouter', utilisateursController.ajouterUtilisateur);

module.exports = router;

