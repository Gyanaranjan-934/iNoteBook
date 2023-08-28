import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const EditProfile = (props) => {
    let navigate = useNavigate()
    const { showAlert } = props;
    const context = useContext(authContext);
    const { credentials, getUserData, updateProfile } = context;
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [fetchedUserData, setFetchedUserData] = useState(false);

    useEffect(() => {
        if (!fetchedUserData) {
            getUserData();
            setFetchedUserData(true);
        }
        setUserData({ name: credentials.name, email: credentials.email });
    }, [credentials, fetchedUserData, getUserData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userData.email.split("@")[1].includes(".")){
            showAlert("Please Enter a valid email id","danger");
        }else{
            updateProfile(credentials._id, userData.name, userData.email);
            showAlert("Edited successfully","success");
            navigate("/");
        }
    };

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="container">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input value={userData.name} type="text" name="name" className="form-control" onChange={onChange} id="name" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input value={userData.email} type="email" name="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        </>
    );
}

export default EditProfile;
