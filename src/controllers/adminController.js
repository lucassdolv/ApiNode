const adminService = require("../services/adminService")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");


const adminController = {
    create: async (req, res) => {
        try {
            const admin = await adminService.create(req.body);
            return res.status(201).json({
                msg: 'Admin criado com sucesso',
                admin
            })
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao tentar criar o Admin'
            })
        }
    },
    update: async (req, res) => {
        try {
            const admin = await adminService.update(req.params.id, req.body);
            if (!admin) {
                return res.status(400).json({
                    msg: 'Admin nao encontrado'
                });
            }
            return res.status(200).json({
                msg: 'Admin atualizado com sucesso',
                admin
            });
        } catch (error) {
            return res.status(500).json({
                msg: 'Erro ao atualizar o Admin'
            });
        }
    },
    getall: async (req, res) => {
        try{
            const admins = await adminService.getAll();
            return res.status(200).json({
                msg: 'Todos os adms!', 
                admins
            })
        }catch(error){
            return res.status(500).json({
                msg: 'Ocorreu um error no Servidor'
            })
        }
    },
    getOne: async (req, res) => {
        try{
            const admin = await adminService.getById(req.params.id);
            if (!admin){
                return res.status(400).json({
                    msg: 'Admin nao encontrado'
                });
            }
            return res.status(200).json({
                msg: 'Admin encontrado',
                admin
            });
        }catch(error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no Servidor'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const admin = await adminService.delete(req.params.id);
            if(!admin){
                return res.status(400).json({
                    msg: 'Admin nao encontro'
                })
            }
            return res.status(200).json({
                msg: 'Admin deletado com sucesso!'
            });
        }catch (error) {
            return res.status(500).json({
                msg: 'Ocorreu um erro no servidor'
            });
        }
    },
    login: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const admin = await adminService.getByEmail(email);
            if (!admin) {
                return res.status(400).json({ msg: "Email ou senha inválidos" });
            }
            const isPasswordValid = await bcrypt.compare(senha, admin.senha);
            if (!isPasswordValid) {
                return res.status(400).json({ msg: "Email ou senha inválidos" });
            }

            const token = jwt.sign(
                { id: admin.id, email: admin.email }, 
                JWT_SECRET, 
                { expiresIn: "1h" }
            );
            return res.status(200).json({ 
                msg: "Login bem-sucedido", 
                token,
                admin
            });
        } catch (error) {
            console.error("Erro ao tentar fazer login:", error);
            return res.status(500).json({ msg: "Erro no servidor ao tentar fazer login" });
        }
    },
    forgotPassword: async (req, res) => {
        const { email, novaSenha } = req.body;
        try {
            // Busca o admin pelo email
            const admin = await adminService.getByEmail(email);
            if (!admin) {
                return res.status(400).json({ msg: "Email inválido" });
            }

            // Gera o hash da nova senha
            const saltRounds = 10;
            const hashedSenha = await bcrypt.hash(novaSenha, saltRounds);

            // Atualiza a senha do admin com a nova senha criptografada
            await adminService.update(admin.id, { senha: hashedSenha });

            return res.status(200).json({ msg: "Senha atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao tentar redefinir a senha:", error);
            return res.status(500).json({ msg: "Erro no servidor ao tentar redefinir a senha" });
        }
    }

    
}

module.exports = adminController;