import { validationResult } from "express-validator";
import Livraison from "../model/Livraison.js";
export function addliv (req,res){
    if(!validationResult(req).isEmpty()){
         res.status(400).json({error:validationResult(req).array});
     }else{
         Livraison
         .create({
             Nom_Client: req.body.Nom_Client,
             address_mail_Client: req.body.address_mail_Client,
             address_Client: req.body.address_Client,
             numero_Client:req.body.numero_Client,
             code_postal:req.body.code_postal,
             id_Pc:req.body.id_Pc,
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
    livraison
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({error:err})
    });
}

export function getOnceliv(req,res) {
    livraison
    .findOne({"Nom_Client":req.params.Nom_Client})
    .then(doc =>{
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error:err});
    })
}

export function deleteOnceliv(req,res){
    livraison
    .findOneAndDelete({"Nom_Client":req.params.Nom_Client})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}

export function deleteAllliv(req,res){
    livraison
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
  
      livraison
        .findOne({ Nom_Client: Nom_Client })
        .then((newlivraison) => {
  
  
          if (req.body.address_mail_Client) {
            newlivraison.address_mail_Client = req.body.address_mail_Client;
          }
          if (req.body.address_Client) {
            newlivraison.address_Client = req.body.address_Client;
          }
          if (req.body.numero_Client) {
            newlivraison.numero_Client = req.body.numero_Client;
          }
          if (req.body.code_postal) {
            newlivraison.code_postal=req.body.code_postal       
          }
          if (req.body.id_Pc){
            newlivraison.id_Pc=req.body.id_Pc
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
