import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
import { MdAdminPanelSettings } from 'react-icons/md'
// import { string, z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash, FaLock, FaRegUser, FaUser, FaUserLock } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { CiLock } from 'react-icons/ci'

const Login = () => {
  // const scheme = z.object({
  //    phone:string().refine(
  //     (value) => /^\+?[0-9]{1,12}$/.test(value.replace(/\s/g, "")),
  //           'This field is required'
  //    ),
  //    password: z.string().min(3,{message:'This field is required'})
  // })


  
  // const url = "https://api.dezinfeksiyatashkent.uz/api/auth/signin"
  const navigation = useNavigate();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const token = localStorage.getItem("access_token")

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://api.dezinfeksiyatashkent.uz/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          phone_number: phone,
          password: password
        }),
        headers: {
             'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((item)=> item.json())
    .then((res)=> {
      console.log(res)
      if(res?.success === true ){
        localStorage.setItem("access_token", res?.data?.tokens?.accessToken?.token)
        navigation("/")
        toast.success("Successfully!")
      }else{
        toast.error("Something went wrong")
        navigation("/login")
      }
    })
  }

  useEffect(()=>{
    if(token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.")){
      navigation("/")
    }
  },[])



  return (
    <div className='flex justify-center pt-52 bg-black h-[100vh]'>
       <div className='w-[500px] h-[400px] bg-slate-300 rounded-lg'>
        <div>
        <h1 className='mt-2 ml-52 text-[5rem] text-blue-600'><MdAdminPanelSettings /></h1>
            <h2 className='ml-44 text-2xl text-gray-600 bold '>Welcome Back!</h2>
        </div>

          <form onSubmit={handleSubmit} className='flex flex-col justify-center pt-5 w-[100%]'>
          <div>
          <div className='flex mt-2 items-center ml-20 border-[1px] border-white bg-white h-[50px] px-3 rounded-lg w-[350px]'>
          <FaUser className='text-md cursor-pointer text-blue-600'/><input onChange={(e)=> setPhone(e?.target?.value)} required className=' w-[350px]  p-2 text-md outline-none rounded-lg' type="text" placeholder='Number'/>
          </div>
           <div className='flex mt-2 items-center ml-20 border-[1px] border-white bg-white h-[50px] px-3 rounded-lg w-[350px]'>
           <FaLock className='text-md cursor-pointer text-blue-600'/><input onChange={(e)=> setPassword(e?.target?.value)} required className='w-[350px] p-2   text-md outline-none rounded-lg' type={passwordOpen?"text":"password"} placeholder='Password'/>
            {
              passwordOpen ?
              <FaEye className='text-xl cursor-pointer text-blue-600' onClick={e=> setPasswordOpen(false)}/>
              :
              <FaEyeSlash className='text-xl cursor-pointer  text-blue-600' onClick={e=> setPasswordOpen(true)}/>
            }
           </div>
            </div>
            <button type='submit' className='text-xl w-[220px] text-white mt-2 ml-36 p-2 bg-blue-600 hover:bg-blue-500 duration-300'>Log In</button>
          </form>
       </div>
    </div>
  )
}

export default Login


//   async function loginUser({ phone, password }) {
//     try {
//         const response = await axios.post(url + "/auth/signin", {
//             phone_number: phone,
//             password: password
//         });

//         if (response.data.data.tokens.accessToken.token) {
//             const token = response.data.data.tokens.accessToken.token;
//             localStorage.setItem('token', token);
//             dispatch({ payload: token, type: "LOGIN" });
//             navigate('/admin/cars');
//             toast.success("Logged In Successfully", {
//                 position: "top-center"
//             });
//             reset()
//         }
//     } catch (error) {
//         toast.error("Wrong Number or Password, Try Again", {
//             position: "top-center"
//         });
//         setError('root', {
//             message: "Phone or Password is incorrect"
//         });
//     }
// }
  // const {register, handleSubmit, reset, setError, formState:{isNotClean,isSubmitting, errors}} = useForm({
  //   resolver: zodResolver(scheme)
  // })