const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Channel extends Model {};

Channel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // title: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // body: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // dateCreated: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW
        // },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'User',
        //         key: 'id'
        //     }
        // }
        // messageId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Message',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Channel'
    }
);

module.exports = Channel;