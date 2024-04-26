import React, { useState } from 'react'
import Layout from './../../components/Layout/Layout.js'
import "../../styles/Authstyles.css";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth.js';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [auth,setAuth] = useAuth()
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit =  async(e)=>{
       e.preventDefault();
       try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        console.log(res.data.message);
        if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user: res.data.loggedInUser,
              token: res.data.token,
            });
            localStorage.setItem('auth', JSON.stringify({ user: res.data.loggedInUser, token: res.data.token }));
            navigate(location.state || "/");
          } else {
            toast.error(res.data.message);
          }
       } catch (error) {
        toast.error("something went wrong")
       }
      
    }
  return (
    <div>
    <Layout>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    aria-describedby="emailHelp" placeholder='email'
                   required
                     />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" 
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                    id="exampleInputPassword1" placeholder='password'
                    required
                     />
                </div>
                <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot password</button>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    </Layout>
</div>
  )
}

export default Login