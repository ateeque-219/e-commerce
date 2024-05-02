import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout.js'
const Order = () => {
  return (
    <>
    <Layout>
    <div className='container-fluid m-3 p-3'>
            <div className='row m-10' >
                <div className='col-md-3'><UserMenu/></div>
                <div className='col-md-9'>All Order</div>
            </div>
            </div>
    </Layout>
    </>
  )
}

export default Order