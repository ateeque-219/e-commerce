import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
const CreateProduct = () => {
  return (
    <div>
        <Layout>
        <div className='container-fluid m-3 p-3'>
        <div className='row ' >
                <div className='col-md-3'><AdminMenu/></div>
                <div className='col-md-9'>Create Product</div>
            </div>
            </div>
        </Layout>
       
    </div>
  )
}

export default CreateProduct