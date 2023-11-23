import { validationResult } from "express-validator";
import Livraison from "../model/Livraison.js";
import ReservationPc from "../model/ReservationPc.js";

export function addres(req,res){
    if(!validationResult(req).isEmpty()){
        res.status(400).json({error:validationResult(req).array});
    }else{
        ReservationPc
        .create({
            //id_r:req.body.id_r,
            Nom_R: req.body.Nom_R,
            id_Pc:req.body.id_Pc
        })
        .then((newreservationPc)=>{
            res.status(200).json(newreservationPc)
        })
        .catch(err => {
            res.status(500).json({error:err})
        });
    }

}
export function getress(req,res){
    ReservationPc
    .find({})
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({error:err})
    })
}
export function getOnceRes(req,res){
  ReservationPc
  .findById({_id : req.params._id})
  .then(docs => {
      res.status(200).json(docs);
  })
  .catch(err => {
      res.status(500).json({error:err})
  })
}
export function deleteOnceRess(req, res) {
    ReservationPc
    .findOneAndDelete({ _id: req.params._id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
  export function updateres(req,res){
    ReservationPc
    .findByIdAndUpdate(req.params._id, req.body)
    .then((updatedres)=>{
      res.status(200).json(updatedres);
    })
    .catch((err)=>{
      res.status(400).json({error:err});
    });
  }