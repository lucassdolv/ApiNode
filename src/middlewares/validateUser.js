// validateUser.js

const validateUser = (req, res, next) => {
    const { nome, email } = req.body;

    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({
            msg: 'Campos invalidos'
        });
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({
            msg: 'Campos invalidos'
        });
    }
    if (!(email.includes("@") && email.includes("."))) {
        return res.status(400).json({
            msg: "Campo email invalido"
        });
    }

    // Se tudo estiver ok, chame o next()
    next();
};

const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({
            msg: "Parametro ID invalido"
        });
    }

    // Se tudo estiver ok, chame o next()
    next();
};

module.exports = { validateUser, validateUserId };
