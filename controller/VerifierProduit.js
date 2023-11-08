/*import { validationResult } from "express-validator";
import verifierProduit from "../model/VerifierProduit.js";
import livraison from "../model/Livraison.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport ({
    service: 'Gmail',

    auth: {
        user:'karim.kekli2000@gmail.com',
        pass:'kimouca1920',
    },
})

export function verfi (req,res){
    if(!validationResult(req).isEmpty()){
        res.status(400).json({error:validationResult(req).array});
    }else {
        const id_liv=req.body.id_liv;
        const etat_P=req.body.etat_P;

        livraison.findById(id_liv)
        .then((livraison)=>{
            if (!livraison){
                res.status(500).json({message:'colis non trouvé '});
            }
            if (etat_P === 'en_bon_etat'){  

                ///gere notification

                const mailOption = {
                    from:'karim.kekli2000@gmail.com',
                    to:livraison.address_mail_Client,
                    subject: 'État de votre produit',
                    text: 'Votre produit est en bon état',

                };
                transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                      console.error('Erreur lors de l\'envoi de l\'e-mail : ' + error);
                    } else {
                      console.log('E-mail envoyé : ' + info.response);
                    }
                });

            }else if (etat_P ==='en mauvaise etat'){
                ///gere notification
                const mailOption = {
                    from:'karim.kekli2000@gmail.com',
                    to:livraison.address_mail_Client,
                    subject: 'État de votre produit',
                    text: 'Votre produit est en mouvaise état',

                };
                transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                      console.error('Erreur lors de l\'envoi de l\'e-mail : ' + error);
                    } else {
                      console.log('E-mail envoyé : ' + info.response);
                    }
                });

                
            }
            res.status(200).json({message: 'verification terminer '});
        })
        .catch(err => {
            res.status(500).json({error:err});
        });

    }

}*/