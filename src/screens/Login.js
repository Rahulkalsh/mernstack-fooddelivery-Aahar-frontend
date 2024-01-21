import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
export default function Login() {
  const [credendtials, setcredendtials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const baseUrl = "https://rahulkalsh-mernstack-food-delivery-aahar.onrender.com"
  // const baseUrl="http://localhost:5000"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credendtials.email,
        password: credendtials.password
      })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Data");
    }
    if (json.success) {
      localStorage.setItem('userEmail', credendtials.email)
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
    
  }
  const onChange = (event) => {
    setcredendtials({ ...credendtials, [event.target.name]: event.target.value })
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: "MediumSeaGreen" }}>Email address</label>
            <input type="email" className="form-control" name='email' value={credendtials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: "MediumSeaGreen" }}>Password</label>
            <input type="password" className="form-control" value={credendtials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/creatuser" className="m-3 mx-1 btn btn-danger">New User</Link>
        </form>

      </div>
    </div>
  )
}
