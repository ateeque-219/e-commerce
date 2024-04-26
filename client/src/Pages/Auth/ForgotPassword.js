import React, { useState } from 'react'
import Layout from './../../components/Layout/Layout.js'
import "../../styles/Authstyles.css";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ForgotPassword = () => {
   
    const[newPassword,setnewPassword] = useState("");
    const[email,setEmail] = useState("");
    const[answer,setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit =  async(e)=>{
       e.preventDefault();
       try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword});
        console.log(res.data.message);
        if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            navigate( "/login");
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
                <h1>Reset-Password</h1>
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
                     value={newPassword}
                     onChange={(e)=>setnewPassword(e.target.value)}
                    id="exampleInputPassword1" placeholder='password'
                    required
                     />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" 
                     value={answer}
                     onChange={(e)=>setAnswer(e.target.value)}
                    id="exampleAnswer" placeholder='Your favourite sport'
                    required
                     />
                </div>
           
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>

        </div>
    </Layout>
</div>
  )
}

export default ForgotPassword