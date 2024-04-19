import React, { useState } from 'react'
import Layout from './../../components/Layout/Layout.js'
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
    const [name,setName] = useState ("");
    const[address,setAddress] = useState("");
    const[password,setPassword] = useState("");
    const[phone,setPhone] = useState("");
    const[email,setEmail] = useState("");

    const handleSubmit = (e)=>{
       e.preventDefault();
    toast.success("register successfully");

    }
    return (
        <div>
            <Layout>
                <div className='register'>
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </Layout>
        </div>
    )
}

export default Register