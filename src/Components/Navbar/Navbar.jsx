import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {
    const [modal,setModal] = useState(false)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/login")
    }
  return (
    <nav className='w-full h-[70px] flex items-center justify-end pr-14 bg-slate-200'>
        <button onClick={e=>{setModal(true)}} className='bg-red-500 text-2xl text-white px-10 py-2 rounded-md font-semibold'>
         <IoIosLogOut />
        </button>

        <div className={`fixed w-full h-full top-0 left-0 z-50 bg-slate-300 items-center justify-center ${modal?'flex':'hidden'}`}>
            <div className='bg-white shadow-black rounded-2xl px-5 py-10'>
                <p className='text-lg font-semibold text-center'>Want to Log out?</p>
                <div className='flex items-center justify-center gap-4 mt-8'>
                    <button className='bg-blue-600 text-white rounded-md px-6 py-2' onClick={e=>{setModal(false)}}>Cancel</button>
                    <button className='bg-red-600 text-white rounded-md px-6 py-2' onClick={e=>{logout();setModal(false);toast.success("Successfully logged out!")}}>Confirm</button>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
