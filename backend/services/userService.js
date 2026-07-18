const bcrypt = require( "bcryptjs" );
const jwt = require( "jsonwebtoken" );
const User = require( "../models/User" );

const registerUser = async ( { username, email, password } ) => {
    const existingUser = await User.findOne( {
        $or: [ { username }, { email } ]
    } );

    if ( existingUser ) {
        const error = new Error(
            "A user with the provided username or email already exists."
        );
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash( password, 10 );

    const user = await User.create( {
        username,
        email,
        password: hashedPassword
    } );

    const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" } );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
};

const userLogin = async ( { email, password } ) => {
    const user = await User.findOne( { email } );

    if ( !user ) {
        const error = new Error( "Invalid email or password" );
        error.statusCode = 401;
        throw error;
    }

    const isPasswordCorrect = await bcrypt.compare( password, user.password );

    if ( !isPasswordCorrect ) {
        const error = new Error( "Invalid email or password" );
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    } );

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
};

module.exports = {
    registerUser,
    userLogin
};
