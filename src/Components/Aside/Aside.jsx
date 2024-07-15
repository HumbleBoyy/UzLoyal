import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaMicroblog, FaRegNewspaper } from 'react-icons/fa6'
import { GrResources } from 'react-icons/gr'
import { MdFactCheck } from 'react-icons/md'
import { MdAdminPanelSettings } from "react-icons/md";
import { RiCustomerService2Line } from 'react-icons/ri';
import { TbCategoryPlus } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

const Aside = () => {
    const [open, setOpen] = useState(true)
  return (
    <>
    <aside className={`flex flex-col h-[100vh] bg-black  pt-12 ${open?'px-8 w-[270px]':'px-3 w-[90px]'} text-white relative transition-all duration-500`}>
       {
         open?
         <>
            <h1 className='font-bold text-2xl mb-5'>Admin</h1>
            <ul className='flex flex-col gap-5 '>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/categories'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                        <TbCategoryPlus />
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/faqs'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                    <MdFactCheck />
                        Faqs
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/news'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                    <FaRegNewspaper className='text-xl'/>
                        News
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/blogs'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                    <FaMicroblog />
                        Blogs
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/services'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                    <RiCustomerService2Line />
                        Services
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{borderBottom:"1px solid #1677FF",color:"#1677FF"}:null} to={'/sources'} className='flex border-b-[1px] border-b-transparent items-center gap-2 text-lg pb-1 hover:text-blue-600 transition-all duration-300'>
                    <GrResources />
                        Sources
                    </NavLink>
                </li>
            </ul>
         </>
         :
         <>
            <h1 className='mb-5  text-[5rem]'><MdAdminPanelSettings /></h1>
            <ul className='flex flex-col items-center gap-5'>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/categories'} className='text-2xl hover:text-blue-600 transition-all duration-300'>
                    <TbCategoryPlus />
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/faqs'} className='text-2xl hover:text-blue-600 transition-all duration-300'>
                    <MdFactCheck />
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/news'} className='text-2xl hover:text-blue-600 transition-all duration-300'>
                    <FaRegNewspaper />
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/blogs'} className='text-2xl hover:text-blue-600 transition-all duration-300'>
                    <FaMicroblog />
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/services'} className='text-2xl hover:text-blue-600 transition-all duration-300'>
                    <RiCustomerService2Line />
                    </NavLink>
                </li>
                <li>
                    <NavLink style={({isActive})=>isActive?{color:"#1677FF"}:null} to={'/sources'} className='text-2xlhover:text-blue-600 transition-all duration-300'>
                    <GrResources />
                    </NavLink>
                </li>
            </ul>
         </>
       }
       {
        !open?
        <button onClick={e => setOpen(true)} className='mt-24 bg-blue-700'>
            <FaChevronRight className='text-lg'/>
        </button>
        :
        <button onClick={e => setOpen(false)} className='mt-24 bg-blue-700'>
             <FaChevronLeft className='text-lg'/>
        </button>
      }
    
    </aside>

     </>
  )
}

export default Aside
