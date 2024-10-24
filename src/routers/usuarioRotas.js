const { Router } = require("express");
const userController = require('../controllers/userController');
const userRoutes = Router();
const { validateUser, validateUserId } = require('../middlewares/validateUser')


userRoutes.post('/', validateUser, userController.create ); // funcao de criar

// funcao de editar
userRoutes.put('/:id', validateUser, validateUserId, userController.update); // parametro id

// funcao de deletar
userRoutes.delete('/:id',validateUser, validateUserId, userController.delete); // parametro id

// funcao buscar unico
userRoutes.get('/:id', validateUserId, userController.getOne); // parametro id

userRoutes.get('/', userController.getall); // funcao buscar todos 

module.exports = userRoutes;