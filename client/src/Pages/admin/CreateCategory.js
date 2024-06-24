import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import AdminMenu from '../../components/Layout/AdminMenu.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Layout/Form/CategoryForm.js';
import { Modal } from "antd";


const CreateCategory = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
      if (res.data?.success) {
        toast.success(`${res.data.name} is created`);
        getAllCategory();
        setName(""); 
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log("Something went wrong while taking the input");
      toast.error("Something went wrong in taking input");
    }
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
      console.log(res.data)
      if (res.data.success) {
        toast.success(`${res.data.name} is updated successfully`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory(); 
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log("Something went wrong while updating");
    }
  };

  const handleDelete = async(xid) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${xid}`);
      if(res.data.success){
        toast.success("category is deleted");
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong while deleting");
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

  useEffect(() => {
    getAllCategory(); 
  }, []);

  return (
    <div>
      <Layout>
        <div className='dashboard-container container-fluid'>
          <div className='dashboard-row row'>
            <div className='dashboard-sidebar col-md-3'>
              <AdminMenu />
            </div>
            <div className='dashboard-content col-md-9'>
              <div className='dashboard-details'>
                <h1>Categories</h1>
                <div className='p-3'>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                </div>
                <div className='mt-3'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Category Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((x) => (
                        <tr key={x._id}>
                          <td>{x.name}</td>
                          <td>
                            <button className="btn btn-primary ms-2" onClick={() => {
                              setOpen(true);
                              setUpdatedName(x.name);
                              setSelected(x);
                            }}>Edit</button>
                            <button className='btn btn-danger ms-2' onClick={() => { handleDelete(x._id) }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Modal visible={open} onCancel={() => setOpen(false)} footer={null}>
                  <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={editSubmit} />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default CreateCategory;
