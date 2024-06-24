import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import "../../index.css";

const Products = () => {
  const [allproduct, setAllProduct] = useState([]);
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      if (res.data?.success) {
        console.log(res.data);
        setAllProduct(res.data?.products);
        toast.success(res.data?.message)
      }
      else {
        toast.error(res.data?.message)

      }
    } catch (error) {
      console.log("something went wrong")
      toast.error("something went wrong");
    }
  }
  useEffect(() => {
    getAllProduct();
  }, [])
  return (

    <Layout>
      <div className='row'>
        <div className='col-md-3'><AdminMenu /></div>
        <div className='col-md-9 '>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap m-2'>
          {allproduct?.map((p) => (
            <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
            <div className="card m-2 " style={{ width: '18rem' }}>
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
              </div>
            </div>
            </Link>
            
          
          ))}
            </div>
        </div>
      </div>
    </Layout>


  )
}

export default Products