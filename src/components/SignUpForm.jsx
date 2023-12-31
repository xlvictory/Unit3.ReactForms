import React from 'react';
import { useState } from 'react';

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    username: {username},
                    password: {password},
                })
            });
            const result = await response.json();
            console.log(result);
            setToken(result.token); 
        } catch(error) {
            setError(error.message);
        }
        if(username.length < 5) {
            setError("Username has to be at least 5 characters", error);
        } if(password.length < 8){
            setError("Password needs to be at least 8 characters", error);
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            {
                error && <p>{error}</p>
            }
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                </label><br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                </label><br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}