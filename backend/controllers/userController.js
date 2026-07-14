const User = require( '../models/User' );
const { createUser } = require( '../services/userService' );

const registerUser = async ( req, res, next ) => {
    try {
        const { username, email, password } = req.body;

        if ( !username ) {
            const error = new Error( 'Username is required.' );
            error.statusCode = 400;
            throw error;
        }

        if ( !email ) {
            const error = new Error( 'Email is required.' );
            error.statusCode = 400;
            throw error;
        }
        if ( !password ) {
            const error = new Error( 'Password is required.' );
            error.statusCode = 400;
            throw error;
        }
        
        const userExists = await User.findOne( { email } );
        if ( userExists ) {
            const error = new Error( 'This email already exists.' );
            error.statusCode = 400;
            throw error;
        }

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