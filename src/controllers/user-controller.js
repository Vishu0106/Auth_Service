const UserService = require('../services/user-service');
const userService = new UserService();
const create = async(req,res) => {
    try {
        const response = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            data: response,
            message: "User created successfully",
            success: true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message: "Something went wrong while creating user",
            error: error,
            success: false
        })
    }
}

const signIn = async(req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data: response,
            message: "User signed in successfully",
            success: true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message: "Something went wrong while signing in user",
            error: error,
            success: false
        })
    }
}
const isAuthenticated = async(req,res,next) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            message: "User is verified",
            success: true,
            err:{}
        });
    } catch (error) {
        return res.status(401).json({
            data:{},
            message: "Unauthorized",
            error: error,
            success: false
        })
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated
}
