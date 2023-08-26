import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authToken)
            props.showAlert("Logged in Succesfully","success")
            navigate("/")
        }
        else{
            props.showAlert(json.error,"danger")
        }
    }   
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container container-sm"> {/* Apply the container-sm class */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" onChange={onChange} />
                </div>
                <button type="submit"  className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
