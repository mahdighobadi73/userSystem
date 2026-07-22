const jwt = require( "jsonwebtoken" );
const User = require( "../models/User" );

const auth = async ( req, res, next32 ) => {
    try {

        const authHeader = req.headers.authorization;
        if ( !authHeader || !authHeader.startsWith( "Bearer " ) ) {
            const error = new Error( "Authentication required" );
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split( " " )[ 1 ];
        const decoded = jwt.verify( token, process.env.JWT_SECRET );

        const user = await User.findById( decoded.id );
        if ( !user ) {
            const error = new Error( "Authentication required" );
            error.statusCode = 401;
            throw error;
        }
        req.user = user;

        next();

    } catch ( error ) {
        next( error );
    }
};

module.exports = auth;