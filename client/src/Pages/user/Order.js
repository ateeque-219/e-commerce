import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout from '../../components/Layout/Layout.js';
import { useAuth } from '../../context/auth.js';
import moment from 'moment';
import axios from 'axios';
import '../../styles/Order.css'; // Import your CSS file

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrder = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <Layout>
      <div className='new-order-container container-fluid m-3 p-3'>
        <div className='new-order-row row'>
          <div className='new-order-sidebar col-md-3'><UserMenu /></div>
          <div className='new-order-content col-md-9'>
            <h1 className='text-center mb-4'>All Orders</h1>
            {orders?.map((o, i) => (
              <div className='new-order-item border shadow mb-4' key={o._id}>
                <table className='new-order-table table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>Buyer</th>
                      <th scope='col'>Date</th>
                      <th scope='col'>Payment</th>
                      <th scope='col'>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.username}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className='new-order-container'>
                  {o?.products?.map((p) => (
                    <div className='new-order-product-card row mb-2 p-3 card flex-row' key={p._id}>
                      <div className='col-md-6'>
                        <img 
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className='new-order-card-img-top'
                          alt={p.name}
                        />
                      </div>
                      <div className='col-md-8 new-order-product-details'>
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
