import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout/Layout.js';
import Prices from './../components/Layout/Prices.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { useCart } from '../context/Cart.js';
import "../styles/Homepage.css";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleFilter = (value, id) => {
    let fil = [...checked];
    if (value) {
      fil.push(id);
    } else {
      fil = fil.filter((c) => c !== id);
    }
    setChecked(fil);
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProduct([...product, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      if (res.data?.success) {
        setLoading(false);
        setProduct([...product, ...res.data?.products]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong while getting all the product");
    }
  };

  const getTotal = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      if (res.data.success) {
        setTotal(res.data.total);
      } else {
        console.log(res.data.total);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const handleradio = (value) => {
    setRadio(value);
  };

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
    getTotal();
  }, []);

  useEffect(() => {
    if (!radio.length && !checked.length) getAllProduct();
  }, [radio, checked]);

  useEffect(() => {
    if (radio.length || checked.length) {
      filterProduct();
    }
  }, [radio, checked]);

  const addToCart = (product) => {
    let cartItems = [...cart];
    cartItems.push(product);
    setCart(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Item added to cart");
  };

  return (
    <div>
      <Layout>
        <div className='row mt-3 m-3'>
          <div className='col-md-2'>
            <h4 className='text-center'>Category Filter</h4>
            <div className='d-flex flex-column m-2'>
              {categories?.map((cat) => (
                <Checkbox key={cat._id} onChange={(e) => handleFilter(e.target.checked, cat._id)}>
                  {cat.name}
                </Checkbox>
              ))}
            </div>
            <h4 className='text-center mt-4'>Price Filter</h4>
            <div className="d-flex flex-column p-2">
              <Radio.Group onChange={(e) => handleradio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className='d-flex flex-column'>
              <button className='btn btn-danger m-2' onClick={() => window.location.reload()}>RESET FILTER</button>
            </div>
          </div>
          <div className='col-md-9 m-4'>
            <h1 className='text-center'>All products</h1>
            <div className='d-flex flex-wrap p-4'>
              {product?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price-one">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className='btn btn-secondary ms-1' onClick={()=>{
                        setCart([...cart,p]) 
                        localStorage.setItem('cart' , JSON.stringify([...cart,p]));
                         toast.success("Product added to cart successfully")}}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {product && product.length < total && (
              <div className='m-2 p-3 abx'>
                <button className='btn btn-warning' onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading ..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
