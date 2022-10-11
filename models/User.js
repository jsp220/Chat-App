const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword (pswd) {
        return bcrypt.compareSync(pswd, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            beforeBulkCreate: (newUsers) => {
                const saltRounds = 10;
                newUsers.forEach((user) => {
                    user.password = bcrypt.hashSync(user.password, saltRounds);
                });
                return newUsers;
            },
            beforeCreate: async (newUser) => {
                const saltRounds = 10;
                newUser.password = await bcrypt.hash(newUser.password, saltRounds);
                console.log(newUser.password);
                return newUser;
            },
            beforeUpdate: async (updatedUser) => {
                const saltRounds = 10;
                updatedUser.password = await bcrypt.hash(updatedUser.password, saltRounds);
                return updatedUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);

module.exports = User;