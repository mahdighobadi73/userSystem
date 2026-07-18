const createError = require( "../utils/createError" );

const registerValidation = ( req, res, next ) => {
    const { username, email, password } = req.body;

    const requiredFields = [
        { key: "username", label: "Username" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" }
    ];

    for ( const field of requiredFields ) {
        if ( !req.body[ field.key ] ) {
            return next( createError( `${ field.label } is required.`, 400 ) );
        }
    }
    next();
}

module.exports = registerValidation;
