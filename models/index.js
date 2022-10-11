const User = require('./User');
const Channel = require('./Channel');
const Message = require('./Message');
const UserChannel = require('./UserChannel');

User.belongsToMany(Channel, {
    // Define the third table needed to store the foreign keys
    through: {
        model: UserChannel,
        unique: false
    },
    // Define an alias for when data is retrieved
    as: 'user_channel'
});

Channel.belongsToMany(User, {
    // Define the third table needed to store the foreign keys
    through: {
        model: UserChannel,
        unique: false
    },
    // Define an alias for when data is retrieved
    as: 'channel_user'
});

// User.belongsToMany(Channel, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// })

// Channel.belongsTo(User, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE'
// });

User.hasMany(Message, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Message.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Channel.hasMany(Message, {
    foreignKey: 'channelId',
    onDelete: 'CASCADE'
});

Message.belongsTo(Channel, {
    foreignKey: 'channelId',
    onDelete: 'CASCADE'
})

module.exports = {
    User,
    Message,
    Channel,
    UserChannel
};