const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserChannel extends Model {}

UserChannel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
                unique: false
            }
        },
        channelId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Channel',
                key: 'id',
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'UserChannel'
    }
);

module.exports = UserChannel;