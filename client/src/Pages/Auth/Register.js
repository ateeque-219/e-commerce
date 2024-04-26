import React, { useState } from 'react'
import Layout from './../../components/Layout/Layout.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/Authstyles.css";

const Register = () => {
    const [name,setName] = useState ("");
    const[address,setAddress] = useState("");
    const[password,setPassword] = useState("");
    const[phone,setPhone] = useState("");
    const[email,setEmail] = useState("");
    const[answer,setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit =  async(e)=>{
       e.preventDefault();
       try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{username:name,email,password,address,phone,answer});
        console.log(res.data.message);
        if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate("/login");
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
                        <h1>Register Page</h1>
                    <div className="mb-3">
                            <input type="text" className="form-control" id="exampleInputUsername"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                             placeholder='Username'
                             required />
                        </div>
                      
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
                        <div className="mb-3">
                            <input type="number" className="form-control" 
                             value={phone}
                             onChange={(e)=>setPhone(e.target.value)}
                            id="exampleInputNumber" placeholder='phone number'
                            required
                             />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" 
                             value={address}
                             onChange={(e)=>setAddress(e.target.value)}
                            id="exampleInputAddress" placeholder='address'
                            required
                             />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" 
                             value={answer}
                             onChange={(e)=>setAnswer(e.target.value)}
                            id="exampleInputAddress" placeholder='what is your favourite sport'
                            required
                             />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </Layout>
        </div>
    )
}

export default Register