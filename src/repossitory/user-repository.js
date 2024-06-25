const {User} = require('../models');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong while creating user");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const user = await User.destroy({
                where: {
                    id:userId
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong while creating user");
            throw error;
        } 
    }
}

module.exports = UserRepository;