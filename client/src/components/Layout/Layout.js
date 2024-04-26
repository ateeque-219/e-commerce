import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'70vh'}}>
        <h1>{children}</h1>
        <Toaster/>
        </main>
        <Footer/>
    </div>
  )
}

export default layout