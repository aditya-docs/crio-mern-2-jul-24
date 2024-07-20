const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const attachUserToReq = (success, userId) => async (req, res, next) => {
    try {
        if(!success)
            return res.sendStatus(403);
        const user = await UserServiceInstance.findById(userId);
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).send({message: "Error in finding the user for this token"})
    }   
}

module.exports = attachUserToReq