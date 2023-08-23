import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYTIwOTU2NjgzZDk3Mzc4M2YzYTA1In0sImlhdCI6MTY5MjAyMDQ0NH0.H7bGGehWCFR2Uh6S7aMaKP27TDtdeeMo1iQ5HS0qiA0"
            },
            body: JSON.stringify({name,email,password}),
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authToken)
            navigate("/")
            props.showAlert("Account Created Succesfully","success")
        }
        else{
          props.showAlert(json.error,"danger")
        }
    }   
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name='name' className="form-control" onChange={onChange} id='name' required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name='email' className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" onChange={onChange} minLength={5} id="password" required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name='cpassword' className="form-control" onChange={onChange} minLength={5} id="cpassword" required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default SignUp