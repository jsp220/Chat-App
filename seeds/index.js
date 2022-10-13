const sequelize = require('../config/connection');
const { User, Message, Channel, UserChannel } = require('../models');

const userSeedData = require('./userSeedData.json');
const channelSeedData = require('./channelSeedData.json');
const messageSeedData = require('./messageSeedData.json');
const userChannelSeedData = require('./userChannelSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync ({ force: true });

    await User.bulkCreate(userSeedData);
    await Channel.bulkCreate(channelSeedData);
    await Message.bulkCreate(messageSeedData);
    await UserChannel.bulkCreate(userChannelSeedData);

    process.exit(0);
}

seedDatabase();