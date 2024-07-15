import React from 'react'
import Aside from '../Aside/Aside'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='flex'>
        <Aside/>

        <div className='relative w-full flex flex-col justify-between h-[100vh] '>  
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    </div>
  )
}

export default Admin
