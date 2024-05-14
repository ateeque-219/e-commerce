import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DetailProduct = () => {
    const params = useParams();
    const [singleproduct , setSingleProduct] = useState({});
    const [relatedproduct,setRelatedProduct] = useState([]);
    const getProduct = async()=>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params?.slug}`);
            if(res.data?.success){
                toast.success(res.data?.message);
                setSingleProduct(res.data?.product);
                relatedProduct(res.data?.product._id  , res.data?.product?.category?._id);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(params?.slug ){
            getProduct()
        }
    },[params?.slug])

    const  relatedProduct = async(pid,cid)=>{
        try{
       const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
       setRelatedProduct(res.data?.products);
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div>
   <Layout>
    <div className='row container mt-2'>
        <div className='col-md-6 '>
        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${singleproduct?._id}`}
         className="card-img-top m-2"  alt='singleproduct?.name' 
         height={"400px"}
         width={"300px"}
         
         />
        </div>
        <div className='col-md-6'>
         <h1 className='text-center p-4 m-4'>Product Details</h1>
          <h6>Name : {singleproduct?.name}</h6>
          <h6>Price : {singleproduct?.price}</h6>
          <h6>Description : {singleproduct?.description}</h6>
          <h6>Category : {singleproduct?.category?.name}</h6>
          <button className='btn btn-secondary ms-1'>Add to Cart</button>
        </div>
    </div>
    <div className='row container mt-2'>
        <h1>Related Products</h1>
        {relatedproduct.length < 1 && (<h5 className='text-center'>No similar Product Fount</h5>)}
        <div className='d-flex flex-wrap p-4 text-center'>
              {relatedproduct?.map((p) => (
                
                  <div className="card m-2 " style={{ width: '18rem' }}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0,20)}</p>
                      <p >$ {p.price}</p>
                      <button className='btn btn-secondary ms-1'>Add to Cart</button>
                    </div>
                    
                  </div>
              

              ))}
            </div>
    </div>
   </Layout>
 

    </div>
  )
}

export default DetailProduct