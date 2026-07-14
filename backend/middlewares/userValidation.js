const creatError = require("../utils/createError");

const userValidation = (req, res, next) => {
    const { username, email, password } = req.body;

    const requiredFields = ["Username", "Email", "Password"];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return next(createError(`${field} is required.`, 400));
        }
    }
    next();
};

module.exports = userValidation;
