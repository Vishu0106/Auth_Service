const UserService = require('../services/user-service');
const userService = new UserService();
const create = async(req,res) => {
    try {
        const response = await userService.createUser({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            message: "User created successfully",
            success: true,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data:{},
            message: error.message,
            error: error.explanation,
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
        return res.status(error.statusCode).json({
            data:{},
            message: error.message,
            error: error.explanation,
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

const isAdmin = async(req,res) => {
    try { 
        const response = await userService.isAdmin(req.body.id);
        console.log(`response`, response);
        if(response) {
        return res.status(200).json({
            data: response,
            message: "Successfully featched wheter user is admin or not",
            success: true,
            err:{}
        });
    } else {
        return res.status(400).json({
            data: response,
            message: "User is not admin",
            success: false,
            err:{}
        });
    }
  }catch(error) {
    return res.status(500).json({
        data:{},
        message: "Something went wrong while checking if user is admin",
        error: error,
        success: false
    })
  
  }
}
module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}
