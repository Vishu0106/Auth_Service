const {User , Role } = require('../models');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');
const {StatusCodes} = require('http-status-codes')
class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error)
            }
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
            
            if(!user) {
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Please check the email, as there is no record of email',
                    StatusCodes.NOT_FOUND
                )
            }
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