import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '../../components/Loading/Loader';
import { jwtDecode } from 'jwt-decode';
import { AdminSignIn } from '../../services/AdminApi';
import { GetUserInfo } from '../../services/UserApi';
import { setUserInfo } from '../../Redux/UserSlice';
import { useDispatch } from 'react-redux';

function AdminLogin() {

  const dispatch = useDispatch()

    const navigate = useNavigate()
    const [form,setForm]=useState({ email:'',password:''})
    const [loading,setLoading]=useState()
    const Handleloading =()=>setLoading((cur)=>!cur)

    useEffect(()=>{
      document.title="InsighIT | Admin Login";
    },[])

    const ValidateForm=()=>{
        if (form.email.trim() === ''){
            toast.error("email cannot be empty!!!")
            return false
        }else if(form.password.trim() === ''){
            toast.error("password cannot be empty!!!")
            return false
        }else if (!isValidEmail(form.email)){
            toast.error("Enter valid email")
            return false
        }
        return true

    }

    function isValidEmail(email){
        const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return Regex.test(email);

    }

    const fetchUserInfo=async (token) =>{
      try{
        const id =token.user_id
        const res=await GetUserInfo(id)
        
        const data={
          id:res.data.id,
          first_name:res.data.first_name,
          last_name:res.data.last_name,
          email:res.data.email,
          role:res.data.role,
          is_active:res.data.is_active,
          is_google:res.data.is_google,
          bio:res.data.bio,
          profile_img:res.data.profile_img,
          cover_img:res.data.cover_img,
          tag_name:res.data.tag_name,
          is_premium:res.data.is_premium,
          wallet_balance:res.data.wallet_balance,
        }
        dispatch(setUserInfo({
          userinfo:data
        }))
       
      
      }
      catch{
        toast.error("error occured!!!")
      }
    }

    const FormHandlerLogin = async (e)=>{
        e.preventDefault();

        if (ValidateForm()){
            
            Handleloading();

            AdminSignIn(form).then((res)=>{
                if (res.status === 200){
                    const token = JSON.stringify(res.data)
                    const decoded = jwtDecode(token)
                    
                    Handleloading()

                    fetchUserInfo(decoded)

                    if (decoded.role === 'admin' && decoded.is_superuser){
                        localStorage.setItem("token",token)
                        toast.success('Admin Logged in Successfully!!!')
                        navigate('/admin/adminhomepage/')
                        
                    }else{
                        toast.error("Invalid Credentials!!!")
                    }
                }else{
                    Handleloading()
                    toast.error(
                        "Invalid login credentials"
                    )
                }
            })

        }
       
    }

  return (
    <>
    {loading && <Loader/>}
    <ToastContainer/>
    <div className="h-screen w-full flex justify-center items-center">
    <div className="outward-shadow bg-white w-2/4 h-3/4 sm:w-1/3 flex justify-center items-center">
      <form
        className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mt-4"
        action=""
        onSubmit={FormHandlerLogin}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-600">
          ADMIN Login
        </h1>
        <Input
          
          id="email"
          name='email'
          value={form.email}
          className=""
          variant="standard"
          label="Email"
          onChange={(e)=>{
            setForm({...form,[e.target.name]:e.target.value});
          }}
         
        />
        <Input
          name="password"
          value={form.password}
          id="password"
          variant="standard"
          label="Password"
          onChange={(e)=>{
            setForm({...form,[e.target.name]:e.target.value})

          }}
         
        />
        <div className="flex justify-end">
          <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
            Forgot password?
          </a>
        </div>
        <button className="w-11/12 bg-gray-700 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
          Login
        </button>
      </form>
    </div>
  </div>
  </>
  )
}

export default AdminLogin
