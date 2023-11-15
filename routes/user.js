import express from 'express';
const router = express.Router();
//routes
import UserController from '../controller/User.js';

router.post('/create', UserController.createUser);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getUsers);

router.put('/:id/update', UserController.updateUser);

router.delete('/:id/delete', UserController.deleteUser);
export default router;