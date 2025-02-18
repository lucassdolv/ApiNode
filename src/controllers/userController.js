const userService = require("../services/userService")

const userController = {
    create: async (req, res) => {
        try {
            const user = await userService.create(req.body);
            return res.status(201).json({
                msg: 'Usuario criado com sucesso',
                user
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar criar o Usuario'
            })
        }
    },
    update: async (req, res) => {
        try {
            const user = await userService.update(req.params.id, req.body);
            if (!user) {
                return res.status(400).json({
                    msg: 'User nao encontrado'
                });
            }
            return res.status(200).json({
                msg: 'User atualizado com sucesso',
                user
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar o User'
            });
        }
    },
    getall: async (req, res) => {
        try{
            const users = await userService.getAll();
            return res.status(200).json({
                msg: 'Todos os usuarios!', 
                users
            })
        }catch(error){
            return res.status(500).json({
                msg: 'Ocorreu um error no Servidor'
            })
        }
    },
    getOne: async (req, res) => {
        try{
            const user = await userService.getById(req.params.id);
            if (!user){
                return res.status(400).json({
                    msg: 'Usuario nao encontrado'
                });
            }
            return res.status(200).json({
                msg: 'Usuario encontrado',
                user
            });
        }catch(error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no Servidor'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await userService.delete(req.params.id);
            if(!user){
                return res.status(400).json({
                    msg: 'Usuario nao encontro'
                })
            }
            return res.status(200).json({
                msg: 'Usuario deletado com sucesso!'
            });
        }catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },
    
}

module.exports = userController;