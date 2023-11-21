import express from 'express';
const router = express.Router();
import UserController from '../controller/User.js';
import User from '../model/User.js';

//routes

router.post('/create', UserController.createUser);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getUsers);

router.put('/:id/update', UserController.updateUser);

router.delete('/:id/delete', UserController.deleteUser);

router.post('/login', UserController.loginUser);

router.post ('/reset',UserController.forgotPassword);

router.post ('/updatepassword',UserController.updatePassword);





export default router;