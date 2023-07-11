const sequelize = require('../config/connection');
const seedUsers = require('./userSeed');
const seedPosts = require('./postSeed');
const seedComments = require('./commentSeed');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
        console.log('USERS SEEDED');
    await seedPosts();
        console.log('POSTS SEEDED');
    await seedComments();
        console.log('COMMENTS SEEDED');

    process.exit(0);
};

seedAll();