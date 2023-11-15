import { validationResult } from "express-validator";
import Livraison from "../model/Livraison.js";
export function addliv (req,res){
    if(!validationResult(req).isEmpty()){
         res.status(400).json({error:validationResult(req).array});
     }else{
         Livraison
         .create({
             Nom_Article:req.body.Nom_Article,
             Nom_Client: req.body.Nom_Client,
             address_mail_Client: req.body.address_mail_Client,
             numero_Client:req.body.numero_Client,
             ville:req.body.ville,
             address_Client: req.body.address_Client,
         })
         .then((newlivraison)=> {
             res.status(200).json(newlivraison)
         })
         .catch(err => {
             res.status(500).json({error:err})
         });
     }
 }
 
 export function getliv(req,res){
    Livraison
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({error:err})
    });
}

export function getOnceliv(req,res) {
    Livraison
    .findOne({"Nom_Client":req.params.Nom_Client})
    .then(doc =>{
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
}

export function deleteOnceliv(req,res){
    Livraison
    .findOneAndDelete({"Nom_Client":req.params.Nom_Client})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

export function deleteAllliv(req,res){
    Livraison
    .deleteMany({})
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=> {
        res.status(500).json({error:err});
    });
}

export function updateliv(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ error: validationResult(req).array() });
    } else {
      const { Nom_Client } = req.params;
  
      Livraison
        .findOne({ Nom_Client: Nom_Client })
        .then((newlivraison) => {

          if (req.body.Nom_Article) {
            newlivraison.Nom_Article=req.body.Nom_Article   
          }
  
          if (req.body.Nom_Client) {
            newlivraison.Nom_Client=req.body.Nom_Client    
          }
  
          if (req.body.address_mail_Client) {
            newlivraison.address_mail_Client = req.body.address_mail_Client;
          }

          if (req.body.numero_Client) {
            newlivraison.numero_Client = req.body.numero_Client;
          }

          if (req.body.ville){
            newlivraison.ville=req.body.ville
          }
          if (req.body.address_Client) {
            newlivraison.address_Client = req.body.address_Client;
          }
  
          newlivraison
            .save()
            .then((updatedliv) => {
              res.status(200).json(updatedliv);
            })
            .catch((err) => {
              res.status(500).json({ error: err });
            });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  }
