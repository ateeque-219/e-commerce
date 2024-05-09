import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Select } from 'antd'
import { useNavigate , useParams} from 'react-router-dom';
const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const[shipping,setShipping] = useState("");
  const[id,setId] = useState("");

  const getOneProduct = async()=>{
//    e.preventDefault();
   try {
     const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
     if(res.data.success){
        setName(res.data.product.name);
        setCategory(res.data.product.category._id);
        setDescription(res.data.product.description);
        setPrice(res.data.product.price);
        setQuantity(res.data.product.quantity);
        setShipping(res.data.product.shipping);
        setId(res.data.product._id)
     }
     else {
        toast.error(res.data.message);
     }
   } catch (error) {
    toast.error("something went wrong while getting the product")
   }
  }

  const handleUpdate = async(e) =>{
   e.preventDefault()
   try {
    const products = new FormData();
    products.append("name" , name);
    products.append("description" , description);
    products.append("price" , price);
    products.append("quantity" , quantity);
    photo && products.append("photo" , photo);
    products.append("category" , category);

    const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, products)
    if(res.data?.success){
      toast.success(res.data?.message);
      navigate("/dashboard/admin/products")
    }
    else {
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log("something went wrong while updating the product")
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
  
  
  useEffect(()=>{
getOneProduct();
  },[])


  useEffect(() => {
    getAllCategory();
  }, []);


  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if(data?.success){
      toast.success(data?.message);
      navigate("/dashboard/admin/products");
      }
      else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row ' >
          <div className='col-md-3'><AdminMenu /></div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-100'>
              <Select className='w-75'

                showSearch
                placeholder="Select a Category"
                onChange={(value) => { setCategory(value) }}
                size='large'
                value={category}
              >
                {
                  categories?.map((x) => (
                    <Option key={x._id} value={x._id}>
                      {x.name}
                    </Option>
                  ))
                }
              </Select>
              <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-9'>
                  {
                    photo ? photo.name : "Upload image"
                  }
                  <input type='file' name='photo' accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])
                    } hidden />
                </label>
              </div>
              <div className='mb-3 '>
                {
                  photo ?  (
                    <div className='pic'>
                    <img
                      src={URL.createObjectURL(photo)}
                      height={"400px"}
                      className='img img-responsive'
                      alt="Uploaded Image"
                    />
                    </div>
                  ): (<div className='pic'>
                  <img
                   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                    height={"400px"}
                    className='img img-responsive'
                    alt="Uploaded Image"
                  />
                  </div>)
                }
              </div>
              <div className="mb-3 w-75">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-75">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3 w-75">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3 w-75">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3 w-75">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setShipping(value);
                }}
                value={shipping? "Yes":"NO"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3 w-75 ">
              <button className="btn btn-primary " onClick={handleUpdate}>
                Update Product
              </button>

            </div>
            <div className="mb-3 w-75 ">
             
              <button className="btn btn-danger " onClick={handleDelete}>
                Delete Product
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  </div>
  )
}

export default UpdateProduct