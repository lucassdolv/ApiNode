const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

// Definindo o modelo
const Admin = sequelize.define('Admin', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: async (admin) => {
            const salt = await bcrypt.genSalt(10);
            admin.senha = await bcrypt.hash(admin.senha, salt);
        },
        beforeUpdate: async (admin) => {
            if (admin.changed('senha')) {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            }
        }
    }
});

Admin.prototype.validPassword = async function(senha) {
    return await bcrypt.compare(senha, this.senha);
};

module.exports = Admin;
