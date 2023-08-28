import React, { useState } from 'react'
import authContext from './authContext'

const AuthState = (props) => {
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({ name: "", email: "" })

    // Get the user data

    const getUserData = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json()
        setCredentials(json);
    }
    // edit note
    const updateProfile = async (id, name, email) => {
        try {
            const response = await fetch(`${host}/api/auth/update-profile/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ name, email })
            });

            const updatedData = await response.json();

            setCredentials({name: updatedData.name,email: updatedData.email});
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle the error, e.g., show an error message to the user
        }
    };



    return (
        <authContext.Provider value={{ credentials, getUserData, updateProfile }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState