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
            image : `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
            x : req.body.x,
            y : req.body.y,
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
    .findById({_id:req.params._id})
    .then(doc =>{
        res.status(200).json(doc);

    })
    .catch(err => {
        res.status(500).json({error:err});
    });
}
/*

export function deleteOncePc(req,res){
    PointCollecte
    .findOneAndDelete({"Nom_Pc":req.params.Nom_Pc})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
}*/
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
export function deleteOnePoint(req, res) {
  PointCollecte
  .findByIdAndDelete({ _id:req.params._id })
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export function UpdatePoint(req, res) {
  const { _id } = req.params;
  const updatedPoint = req.body;
  if (req.file) {
    updatedPoint.image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`// Mettez à jour le chemin de l'image si une nouvelle image est fournie
  }
    
  PointCollecte.findByIdAndUpdate(_id, updatedPoint)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}