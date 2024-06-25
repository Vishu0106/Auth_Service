const UserRespository = require('../repossitory/user-repository');

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
}

module.exports = UserService;
