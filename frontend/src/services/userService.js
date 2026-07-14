export async function registerUser ( { username, email, password } ) {
try {
    const response = await fetch( 'http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( { username, email, password } ),
    } );

    const data = await response.json();

    if ( !response.ok ) {
        throw new Error( data.error || data.message || 'Unable to register user' );
    }

    return data;
} catch (error) {
    throw new Error(error.message);
}
}
