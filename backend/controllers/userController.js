const { registerUser, userLogin } = require( "../services/userService" );

const register = async ( req, res, next ) => {
    try {
        const { username, email, password } = req.body;

        const registerResult = await registerUser( { username, email, password } );

        res.status( 201 ).json( registerResult );
    } catch ( error ) {
        next( error );
    }
};

const login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;

        const loginResult = await userLogin( { email, password } );

        res.status( 200 ).json( loginResult );
    } catch ( error ) {
        next( error );
    }
};

module.exports = {
    register,
    login
};
