const express = require('express');
const router = express.Router(); 
const  UserController = require ('../controller/User')

router.post('/create', UserController.createUser);

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getUsers);

router.put('/:id/update', UserController.updateUser);

router.delete('/:id/delete', UserController.deleteUser);

module.exports = router;