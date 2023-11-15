import { validationResult } from "express-validator";
import PointCollecte from "../model/PointCollecte.js";

export function addPc (req,res){
    if(!validationResult(req).isEmpty()){
        res.status(400).json({error:validationResult(req).array()});
    } else {
        PointCollecte
        .create({
            Nom_Pc : req.body.Nom_Pc,
            address_mail_Pc : req.body.address_mail_Pc,
            address_Pc : req.body.address_Pc,
            numero_tel : req.body.numero_tel,
            image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
        })
        .then((newpointCollecte)=> {
            res.status(200).json(newpointCollecte)
            }) 

        .catch(err => {
            res.status(500).json({error:err})
        });
    }
}
export function getPc(req,res){
    PointCollecte
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({error:err});
    });
}
export function getOncePc(req,res) {
    PointCollecte
    .findOne({"Nom_Pc":req.params.Nom_Pc})
    .then(doc =>{
        res.status(200).json(doc);

    })
    .catch(err => {
        res.status(500).json({error:err});
    });
}

export function updatePcByName(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ error: validationResult(req).array() });
    } else {
      const { Nom_Pc } = req.body;
  
      PointCollecte
        .findOne({ Nom_Pc: Nom_Pc })
        .then((newpointCollecte) => {
  
  
          // MMAJ les champs indiv
          if (req.body.address_mail_Pc) {
            newpointCollecte.address_mail_Pc = req.body.address_mail_Pc;
          }
          if (req.body.address_Pc) {
            newpointCollecte.address_Pc = req.body.address_Pc;
          }
          if (req.body.numero_tel) {
            newpointCollecte.numero_tel = req.body.numero_tel;
          }
          if (req.file) {
            newpointCollecte.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
          }
  
          // Enregistrement
          newpointCollecte
            .save()
            .then((updatedPc) => {
              res.status(200).json(updatedPc);
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
export function deleteOncePc(req,res){
    PointCollecte
    .findOneAndDelete({"Nom_Pc":req.params.Nom_Pc})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}
export function deleteAllPc(req,res){
    PointCollecte
    .deleteMany({})
    .then(doc=>{
        res.status(200).json(doc);
    })
    .catch(err=> {
        res.status(500).json({error:err});
    });
}