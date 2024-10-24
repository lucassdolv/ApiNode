const { Router } = require("express");
const adminController = require('../controllers/adminController')
const adminRoutes = Router();
const { validateAdmin, validateAdminId } = require('../middlewares/validateAdmin.js')
const authenticateToken = require('../middlewares/authenticateToken');



adminRoutes.post('/', validateAdmin, adminController.create ); // funcao de criar

// funcao de editar
adminRoutes.put('/:id', validateAdmin, validateAdminId, adminController.update); // parametro id

// funcao de deletar
adminRoutes.delete('/:id', validateAdminId, adminController.delete); // parametro id

// funcao buscar unico
adminRoutes.get('/:id', validateAdminId, adminController.getOne); // parametro id

adminRoutes.get('/', adminController.getall); // funcao buscar todos 

adminRoutes.put('/auth/login', adminController.login);

adminRoutes.put('/auth/update/forgotpassword', adminController.forgotPassword)

module.exports = adminRoutes;