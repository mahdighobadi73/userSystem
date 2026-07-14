import { useState } from 'react';
import { registerUser } from '../services/userService';

export default function RegisterForm () {
    const [ username, setUsername ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ status, setStatus ] = useState( null );
    const [ isSubmitting, setIsSubmitting ] = useState( false );

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setStatus( null );
        setIsSubmitting( true );

        try {
            await registerUser( { username, email, password } );
            setStatus( { type: 'success', message: 'Account created successfully.' } );
            setUsername( '' );
            setEmail( '' );
            setPassword( '' );
        } catch ( error ) {
            setStatus( { type: 'error', message: error.message } );
        } finally {
            setIsSubmitting( false );
        }
    };

    return (
        <form onSubmit={ handleSubmit } >
            <label>
                Username
                <input
                    type="text"
                    value={ username }
                    onChange={ ( e ) => setUsername( e.target.value ) }
                    required
                    minLength={ 3 }
                    maxLength={ 30 }
                />
            </label>

            <label>
                Email
                <input
                    type="email"
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    required
                    
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                    minLength={ 8 }
                />
            </label>

            <button type="submit" disabled={ isSubmitting }>
                { isSubmitting ? 'Registering...' : 'Register' }
            </button>

            { status && (
                <p className={ `status-message status-message--${ status.type }` }>
                    {status.type}
                    <br/>
                    { status.message }
                </p>
            ) }
        </form>
    );
}
