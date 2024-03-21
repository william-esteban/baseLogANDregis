const express = require('express');

// llamamos el enrutador a traves del metodo router().
const router = express.Router();

// importacion del controladpr de usuario.
const userController = require('../controllers/userController');

const auth = require('../middleware/auth')


// definicion de rutas y asignacion a funciones del controlador.

router.get('api/v1/users', auth.authenticate(), userController.getAllUsers);
router.get('/api/v1/users/nombre/:name', userController.getUserByName);
router.get('/api/v1/users/id/:id', userController.getuserById);
router.post('/api/v1/users', userController.createUser);
router.patch('/api/v1/users/update/:name', userController.updateUser);
router.delete('/api/v1/users/delete/:name', userController.deleteUser)
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router