const { Router } = require("express");
const userRoutes = require('./usuarioRotas')
const adminRoutes = require('./adminRotas')

const router = Router();

router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;