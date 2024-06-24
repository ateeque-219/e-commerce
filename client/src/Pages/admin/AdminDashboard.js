// import React from 'react'
// import Layout from '../../components/Layout/Layout.js'
// import AdminMenu from '../../components/Layout/AdminMenu.js'
// import { useAuth } from '../../context/auth.js'
// const AdminDashboard = () => {
//   const [auth] = useAuth()
//   return (
//     <div>
//         <Layout>
//             <div className='container-fluid m-3 p-3'>
//             <div className='row'>
//             <div className='col-md-3'>
//               <AdminMenu/>
//             </div>
//             <div className='col-md-9'>
//              <div className='card w-75 p-3' >
//               <h1> Username: {auth?.user?.username}</h1>
//               <h1> Email: {auth?.user?.email}</h1>
//               <h1> Address: {auth?.user?.address}</h1>
              
//              </div>
//             </div>
//             </div>
//             </div>
//             </Layout>
        
//         </div>
//   )
// }

// export default AdminDashboard







import React from 'react';
import Layout from '../../components/Layout/Layout.js';
import AdminMenu from '../../components/Layout/AdminMenu.js';
import { useAuth } from '../../context/auth.js';
import '../../styles/AdminDashboard.css'; // Make sure to import the CSS file

const AdminDashboard = () => {
  const [auth] = useAuth();

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
                <h1>Username: {auth?.user?.username}</h1>
                <h1>Email: {auth?.user?.email}</h1>
                <h1>Address: {auth?.user?.address}</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;