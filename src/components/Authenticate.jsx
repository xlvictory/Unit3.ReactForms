import React from 'react';
import { useState } from 'react';

export default function Authenticate({ token }) {

    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({});

    async function handleClick() {

        try {

            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const result = await response.json();
            console.log(result);
            // const user = result.data.username.username;
            setSuccessMessage(result.message);
            setInfo(result.data.username);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Authenticate</h2>
            {successMessage && <p className='success'>{successMessage} <br />Your username is {info.username}</p>}
            {error && <p className='error'>{error}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}