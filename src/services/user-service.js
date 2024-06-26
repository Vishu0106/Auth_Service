const UserRespository = require('../repossitory/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {JWT_SECRET} = require('../config/server-config');
class UserService {
    constructor() {
        this.userRepository = new UserRespository();
    }

    async createUser(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong while creating user in service layer");
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await this.userRepository.destroy(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong while deleting user in service layer");
            throw error;
        }
    }

    async getUser(userId) {
        try {
            const user = await this.userRepository.getUser(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong while fetching user in service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword) {
        try {
            const user =  await this.userRepository.getByEmail(email);
            if(!user){
                throw new Error("User not found");
            }
            const isPasswordValid = this.checkPassword(plainPassword,user.password);
            if(!isPasswordValid){
                throw new Error("Invalid password");
            }
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong while signing in user in service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const token = jwt.sign(user, JWT_SECRET,{expiresIn:'1d'});
            return token;
        } catch (error) {
            console.log("Something went wrong while creating token in service layer");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            return user;
        } catch (error) {
            console.log("Something went wrong while verifying token in service layer",error);
            throw error;
        }
    }

    checkPassword(plainPassword, hashedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, hashedPassword);
        } catch (error) {
            console.log("Something went wrong while checking password in service layer",error);
            throw error;
        }
    }
}

module.exports = UserService;
