import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout.js'
import Prices from './../components/Layout/Prices.js'

import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox , Radio} from 'antd'

const HomePage = () => {
  
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);

  const handleFilter = (value,id)=>{
     let fil = [...checked];
     if(value){
      fil.push(id);
     }
     else{
      fil=fil.filter((c)=> c!==id);
     }
     setChecked(fil);
  }



 


  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      if (res.data?.success) {
        setProduct(res.data?.products)
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong while getting all the product");
    }
  }
 

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const handleradio =(value)=>{
      setRadio(value);
      // console.log(radio);
  }

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-products`, {
        checked,
        radio,
      });
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory(); 
  }, []);

  useEffect(() => {
    if(!radio.length  && !checked.length)getAllProduct();
  }, [radio,checked]);

  useEffect(()=>{
    if(radio.length  || checked.length){
      filterProduct()
    }
  },[radio,checked])
  return (
    <div>
      <Layout>
        <div className='row mt-3 m-3'>
          <div className='col-md-2 '>
            {/* {JSON.stringify(checked,null,4)} */}
            <h4 className='text-center '>Category Filter</h4>
             <div className='d-flex flex-column m-2 '>
              {
                categories?.map((cat)=>(
                  <Checkbox key={cat._id} onChange={(e)=>handleFilter(e.target.checked , cat._id)}>
                    {cat.name}
                  </Checkbox>
                ))
              }
             </div>
             <h4 className='text-center mt-4 '>Price Filter</h4>
             <div className="d-flex flex-column p-2">
            <Radio.Group onChange={(e) => handleradio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='d-flex flex-column p-2'>
            <button className='btn btn-danger' onClick={(e)=>window.location.reload()}>Reset</button>
          </div>
          </div>
          <div className='col-md-9 m-4'>
            <h1 className='text-center'>All products</h1>
            <div className='d-flex flex-wrap p-4'>
              {product?.map((p) => (
                
                  <div className="card m-2 " style={{ width: '18rem' }}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0,20)}</p>
                      <p >$ {p.price}</p>
      
                      <button className='btn btn-primary ms-1'> More Detail</button>
                      <button className='btn btn-secondary ms-1'>Add to Cart</button>
                    </div>
                    
                  </div>
              

              ))}
            </div>
          </div>
          
        </div>
      </Layout>
    </div>
  )
}

export default HomePage