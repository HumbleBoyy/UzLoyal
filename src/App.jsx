import React, { useEffect, useState } from 'react';
import Admin from "./Components/Layout/Admin"
import Login from './Components/Login/Login'
import { Navigate, Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import Categories from './Pages/Categories/Categories';
import Blogs from './Pages/Blogs/Blogs';
import Faqs from './Pages/Faqs/Faqs';
import News from './Pages/News/News';
import Services from './Pages/Services/Services';
import Sources from './Pages/Sources/Sources';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { current } from '@reduxjs/toolkit';

const App = () => {
  const token = localStorage.getItem("access_token")
  const navigate =  useNavigate()
  const location = useLocation()


   useEffect(()=>{
    if(token?.length>0){
      if(location.pathname === '/login' || location.pathname === "/"){
        navigate("/categories")
      }
    }else{
      navigate("/login")

    }
  },[token, navigate, location.pathname])


  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/login' element={<Login/>}/>
       <Route path='/' exact element={token ? <Admin/> : <Navigate to="/login"/>}>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/faqs' element={<Faqs/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/sources' element={<Sources/>}/>
          <Route path='/' element={<Navigate to='/categories' replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
     </Routes>
    </>
  )
}

export default App
