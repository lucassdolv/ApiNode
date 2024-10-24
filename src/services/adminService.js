const Admin = require("../models/admin")

const adminService = {
    create: async (admin) => {
        try {
            return await Admin.create(admin);
        } catch (error) {
            throw new Error('Ocorreu um erro ao Criar Admin');
        }
    },
    update: async (id, adminToUpdate) => {
        try {
            const admin = await Admin.findByPk(id);
            if(!admin) {
                return null;
            }
            await admin.update(adminToUpdate); 
            await admin.save(); 
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao Atualizar Admin');
        }
    },
    getById: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) { 
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar unico Admin');
        }
    },
    getAll: async () => {
        try {
            return await Admin.findAll();
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar todos Admin');
        }
    },
    delete: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            if (!admin) {
                return null;
            }
            await admin.destroy();
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao deletar o Admin');
        }
    },
    getByEmail: async (email) => {
        try {
            const admin = await Admin.findOne({ where: { email } });
            if (!admin) {
                return null;
            }
            return admin;
        } catch (error) {
            throw new Error('Ocorreu um erro ao buscar Admin por email');
        }
    
    }
}

module.exports = adminService;