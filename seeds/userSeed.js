const sequelize = require('../config/connection');
const { User } = require('../models');

const seedUsers = async () => {
    const userData = [
        {"username":"user1","password":"password","email":"user1@email.com"},
        {"username":"user2","password":"password","email":"user2@email.com"},
        {"username":"user3","password":"password","email":"user3@email.com"},
        {"username":"user4","password":"password","email":"user4@email.com"},
        {"username":"user5","password":"password","email":"user5@email.com"}
    ];
    
    await User.bulkCreate(userData, {
        individualHooks: true,
    });
};

module.exports = seedUsers;