const utilisateursModel = require('../models/utilisateursModel');

const ajouterUtilisateur = async (req, res) => {
    const { nom, courriel, mot_de_passe } = req.body;

    if (!nom || !courriel || !mot_de_passe) {
        return res.status(400).json({ erreur: 'Un ou plusieurs champs obligatoires sont manquants' });
    }

    utilisateursModel.validerCourriel(courriel)
    .then((result) =>
    {
        if (result) {
            return res.status(400).json({ erreur: 'Le courriel existe déjà' });
        }
    })

    utilisateursModel.ajouterUtilisateur(nom, courriel, mot_de_passe, (error, result) => {
        if (error) {
            console.error(error); 
            return res.status(500).json({ erreur: "Erreur lors de l'ajout de l'utilisateur" });
        }
        res.status(201).json({ message: "Utilisateur ajouté avec succès", nom, courriel, cle_api: result.insertId});
    });
};

module.exports = {
    ajouterUtilisateur
};
