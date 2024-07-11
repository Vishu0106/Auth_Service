const {User , Role } = require('../models');

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
            return user;
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

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return await user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong while checking if user is admin");
            throw error;
        }
    }
}

module.exports = UserRepository;