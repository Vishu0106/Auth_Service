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

    async getUser(userId) {
        try {
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
        } catch (error) {
            console.log("Something went wrong while fetching user");
            throw error;
        }
    }
    async getByEmail(email) {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong while fetching user by email");
            throw error;
        }
    }
}

module.exports = UserRepository;