import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import { useSearch } from '../../context/search.js'
import { useNavigate } from 'react-router-dom'

const SearchPage = () => {
    const [values,setValues] =useSearch();
    const navigate = useNavigate();
  return (
    <div>
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h1>All Results</h1>
                <h6>{values?.results.length<1 ? "Nothing match with your search" : `${values?.results.length} products found`}</h6>
                <div className='d-flex flex-wrap p-4 m-4'>
              {values?.results.map((p) => (
                
                  <div className="card m-2 " style={{ width: '18rem' }}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0,20)}</p>
                      <p >$ {p.price}</p>
      
                      <button className='btn btn-primary ms-1' onClick={()=>navigate(`/product/${p.slug}`)}> More Detail</button>
                      <button className='btn btn-secondary ms-1'>Add to Cart</button>
                    </div>
                    
                  </div>
              

              ))}
            </div>
            </div>
        </div>
    </Layout>
    </div>
  )
}

export default SearchPage