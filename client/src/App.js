
import './App.css';
import { Routes,Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Policy from './Pages/Policy';
import Contact from './Pages/Contact';
import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path='/About' element = {<About/>} />
      <Route path='/Privacy' element = {<Policy/>} />
      <Route path='/Contact' element = {<Contact/>} />
      <Route path='/*' element = {<PageNotFound/>} />
     </Routes>
    
    </>
  );
}

export default App;
