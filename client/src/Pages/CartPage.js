import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout.js'
import { useCart } from '../context/Cart.js'
import { useAuth } from '../context/auth.js'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
  const [auth,setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const [clientToken,setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
 
  const getTotal=()=>{
    let total = 0;
    cart?.map((i)=>{
        total+=(i.price);
    });
    return total.toLocaleString("en-US",{
      style:"currency",
      currency:"USD",
    })
  }
  const removeItem = (pid)=>{
    try{
   let tempCart = [...cart];
   const remove = cart.findIndex(item => item._id === pid);
   tempCart.splice(remove,1);
   setCart(tempCart);
   localStorage.setItem('cart',JSON.stringify(tempCart));
   getTotal();
    }
    catch(e){
      console.log(e);
    }
  }

  const getToken = async()=>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setclientToken(res.data?.clientToken);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (()=>{
    getToken();
  },[auth?.token])


  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
        <div className='container'>
            <div className='row '>
             <div className='col-md-12 '>
              <h1 className='text-center bg-light m-2 p-2'>
                {`Hello ${auth?.token && auth?.user?.username}`}
              </h1>
              <h5 className='text-center'>
                {
                  cart?.length > 0  ? `You have ${cart.length} product in your cart ${auth?.token ? "":"please login first"} `:"You don't have anything in your cart"
                }
              </h5>
             </div>
            </div>
            <div className='row '>
              <div className='col-md-8'>
                {
                  cart?.map((p) =>(
                    <div className='row flex-row card mb-2 p-2 '>
                   <div className='col-md-8 p-2 '>
                   <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                   width= '50px'
                   height={"300px"}
          
                    className="card-img-top" alt={p.name} />
                   </div>
                   <div className='col-md-4 pt-5 mt-3'>
                    <h3>{p.name}</h3>
                    <h3>{p.description.substring(0,30)}</h3>
                    <h3>price : {p.price}</h3>
                    <button className='btn btn-danger' onClick={()=>removeItem(p._id)}>Remove</button>
                   </div>
                   </div>
                  ))
                }
              </div>
              <div className='col-md-3 text-center'>
               <h2 >Cart Details</h2>
               <h6>Total | Checkout | Payment</h6>
               <hr/>
               <h4>Total:{getTotal()}</h4>
               {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                                  </div>
              )}
               <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage