import React, { useEffect, useState } from 'react';
import Admin from "./Components/Layout/Admin"
import Login from './Components/Login/Login'
import { Navigate, Route,Routes, useNavigate } from 'react-router-dom';
import Categories from './Pages/Categories/Categories';
import Blogs from './Pages/Blogs/Blogs';
import Faqs from './Pages/Faqs/Faqs';
import News from './Pages/News/News';
import Services from './Pages/Services/Services';
import Sources from './Pages/Sources/Sources';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const token = localStorage.getItem("access_token")
  const navigate =  useNavigate()
   useEffect(()=>{
    if(token?.length>0){
        navigate("/")
    }else{
      navigate("/login")

    }
  },[])


  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/login' element={<Login/>}/>
       <Route path='/' element={<Admin/>}>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/faqs' element={<Faqs/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/sources' element={<Sources/>}/>
          <Route path='/' element={<Navigate to="/categories" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
     </Routes>
    </>
  )
}

export default App
