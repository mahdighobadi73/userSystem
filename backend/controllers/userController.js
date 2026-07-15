const User = require( '../models/User' );
const { createUser } = require( '../services/userService' );

const registerUser = async ( req, res, next ) => {
    try {
        const { username, email, password } = req.body;

        const user = await createUser( { username, email, password } );

        res.status( 201 ).json( {
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        } );
    } catch ( error ) {
        next( error );
    }
};

module.exports = {
    registerUser,
};