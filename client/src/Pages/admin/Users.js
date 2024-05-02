import React from 'react'
import Layout from '../../components/Layout/Layout.js'

import UserMenu from '../../components/Layout/UserMenu.js'
const Users = () => {
  return (
    <div>
    <Layout>
    <div className='container-fluid m-3 p-3'>
    <div className='row ' >
                <div className='col-md-3'><UserMenu/></div>
                <div className='col-md-9'>All Users</div>
            </div>
            </div>
    </Layout>
    </div>
  )
}

export default Users