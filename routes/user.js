import express from 'express';
const router = express.Router();
import UserController from '../controller/User.js';
import User from '../model/User.js';

//routes

router.post('/create', UserController.createUser);

router.post('/createadmin', UserController.createAdmin);

router.post('/createOrg', UserController.createORG);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getUsers);

router.put('/:id/update', UserController.updateUser);

router.delete('/:id/delete', UserController.deleteUser);

router.post('/login', UserController.loginUser);

router.post('/loginadmin', UserController.loginAdmin);

router.post ('/reset',UserController.sendActivationCode);

router.post ('/verify',UserController.verifyCode);

router.post ('/forgot',UserController.forgotPassword);

router.post('/:id/ban', UserController.banUser);

router.post ('/change',UserController.changePassword);
router.post ('/forgot',UserController.forgotPassword);


export default router;



