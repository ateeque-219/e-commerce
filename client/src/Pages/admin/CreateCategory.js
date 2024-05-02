import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js'
const CreateCategory = () => {
  return (
    <div>
        <Layout>
        <div className='container-fluid m-3 p-3'>
            <div className='row m-10' >
                <div className='col-md-3'><AdminMenu/></div>
                <div className='col-md-9'>CreateCategory</div>
            </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateCategory