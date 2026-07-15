import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

export default function Profile () {
    const [ profile, setProfile ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( null );



}