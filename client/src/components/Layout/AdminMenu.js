import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
  <>
 <div>
    <div className='text-center'>
  <div className="list-group">
    <h2>Admin Pannel</h2>
    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>

  </div>
</div>
</div>
  </>
  )
}

export default AdminMenu