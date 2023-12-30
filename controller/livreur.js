
import { validationResult } from "express-validator";
import Livreur from "../model/Livreur.js";
import Livraison from "../model/Livraison.js";

export async function countAndShow(req, res) {
  try {
    const count = await Livreur.countDocuments({ etat: true });

    res.status(200).json({ totalDeliveredLivraisons: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function statliv(req, res) {
  try {
    const { idLivraison, etat } = req.body;

    // Vérifiez si un Livreur avec cet idLivraison existe déjà
    const existingLivreur = await Livreur.findOne({ idLivraison });

    if (existingLivreur) {
      return res.status(409).json({ error: "Livreur existe déjà pour cette livraison" });
    }

    // Créez un nouveau Livreur uniquement s'il n'existe pas déjà
    const newLivreur = await Livreur.create({ idLivraison, etat });

    res.status(200).json(newLivreur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
/*
export function getstatliv(req, res){
    Livreur
    .estimatedDocumentCount()
    .then((count) => {
        res.status(200).json({ totalLivree: count });
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    });
}*/

/*
export async function updateLivraisonState(idLivraison) {
  try {
    // Recherchez le Livreur par idLivraison
    const existingLivreur = await LivreurModel.findOne({ idLivraison });

    if (existingLivreur) {
      // Vérifiez si l'état est déjà true
      if (existingLivreur.etat) {
        return { message: "Livraison déjà effectuée" };
      }

      // Mettez à jour l'état de livraison à true
      existingLivreur.etat = true;
      await existingLivreur.save();

      return existingLivreur;
    } else {
      throw new Error("Livreur non trouvé pour cette livraison");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}*/
