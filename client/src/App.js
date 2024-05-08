
import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.js';
import About from './Pages/About.js';
import Policy from './Pages/Policy.js';
import Contact from './Pages/Contact.js';
import PageNotFound from './Pages/PageNotFound.js';
import Register from './Pages/Auth/Register.js';
import Login from './Pages/Auth/Login.js';
import Dashboard from './Pages/user/Dashboard.js';
import PrivateRoute from './components/Layout/Routes/Privateroutes.js';
import ForgotPassword from './Pages/Auth/ForgotPassword.js';
import AdminRoute from './components/Layout/Routes/Adminroutes.js';
import AdminDashboard from './Pages/admin/AdminDashboard.js';
import CreateCategory from './Pages/admin/CreateCategory.js';
import CreateProduct from './Pages/admin/CreateProduct.js';
import Order from './Pages/user/Order.js';
import Profile from './Pages/user/Profile.js';
import UpdateProduct from './Pages/admin/UpdateProduct.js';
import Products from './Pages/admin/Products.js';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/dashboard' element={<PrivateRoute />}> 
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Order/>}/>
          <Route path='user/profile' element={<Profile/>}/>
        </Route> 

        <Route path='/dashboard' element={<AdminRoute />}> 
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          
        </Route> 
       

     <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/Register' element = {<Register/>} />
      <Route path='/Login' element = {<Login/>} />
      <Route path='/About' element = {<About/>} />
      <Route path='/Privacy' element = {<Policy/>} />
      <Route path='/Contact' element = {<Contact/>} />
      <Route path='*' element = {<PageNotFound/>} />
     </Routes>
    
    </>
  );
}

export default App;
