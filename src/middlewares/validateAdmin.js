const validateAdmin = (req, res, next) => {
    const {nome, email, senha} = req.body;

    if(!nome || typeof nome !== 'string') {
        return res.status(400).json({
            msg: 'Campos invalidos'
        });
    }
    if(!email || typeof email !== 'string'){
        return res.status(400).json({
            msg: 'Campos invalidos'
        });
    }
    if(!senha || typeof senha !== 'string'){
        return res.status(400).json({
            msg: 'Campos invalidos'
        });
    }
    if(!(email.includes("@") && email.includes("."))){
        return res.status(400).json({
            msg: "Campo email invalido"
        });
    }
    next()
}

const validateAdminId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            msg: "Parametro ID invalido"
        });
    }
     next()
}
module.exports = { validateAdmin, validateAdminId };
