import React from 'react'
import Header from './Header'
import Footer from './Footer'


const layout = ({children}) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'70vh'}}>
        <h1>{children}</h1>
        </main>
        <Footer/>
    </div>
  )
}

export default layout