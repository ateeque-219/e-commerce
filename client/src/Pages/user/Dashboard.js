import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import UserMenu from '../../components/Layout/UserMenu.js'
import { useAuth } from '../../context/auth.js'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <div>
    <Layout>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu/>
        </div>
        <div className='col-md-9'>
          <div className='w-75 p-3'>
          <h1> Username: {auth?.user?.username}</h1>
              <h1> Email: {auth?.user?.email}</h1>
              <h1> Address: {auth?.user?.address}</h1>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    </div>
  )
}

export default Dashboard