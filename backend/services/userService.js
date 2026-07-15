const bcrypt = require( 'bcryptjs' );
const User = require( '../models/User' );

const createUser = async ( { username, email, password } ) => {
    const existingUser = await User.findOne( {
        $or: [ { username }, { email } ],
    } );

    if ( existingUser ) {
        const error = new Error( 'A user with the provided username or email already exists.' );
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash( password, 10 );

    return User.create( {
        username,
        email,
        password: hashedPassword,
    } );
};

const login = async ( { email, password } ) => {
    const user = await User.findOne( { email } );

    if ( !user ) {
        const error = new Error( 'The email is incorrect.' );
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    createUser,
};
