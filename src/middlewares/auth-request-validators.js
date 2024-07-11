const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({
            success:false,
            data:{},
            message: "Email and password are required",
            err: "Email and password are required"
        });
    }
    
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if(!req.body.id) {
        return res.status(400).send({
            success:false,
            data:{},
            message: "User id is required",
            err: "User id is required"
        });
    
    }

    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}