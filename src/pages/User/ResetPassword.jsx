
import React, { useEffect, useState } from 'react'
import Bloggingimg from '../../assets/Reset password-bro.png'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { accountsapi } from '../../constants/constants';
// import {jwtDecode} from "jwt-decode";
// import { Loader } from '../../components/Loading/Loader';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {
  Card,CardBody,

} from "@material-tailwind/react";
function ResetPassword() {
    const navigate=useNavigate()
    const user_id=localStorage.getItem("user_id")
    const [form,setForm]=useState({password:'',cpassword:'','user_id':user_id})


    // const emailInputRef = useRef(null);
    // const passInputRef = useRef(null);

    useEffect(() => {
       
      document.title="InsighIT | Reset Password";
      }, []);


    
  const validation = () => {
    if (form.password.trim() === ""){
        console.log('first valid')
    toast.error("password should not be empty")
      return false;
    }else if(form.cpassword.trim() === ""){
      toast.error("Confirm your password")
      return false;
    }else if (form.cpassword.trim() !== form.password.trim()){
      toast.error("password does not match")
      return false;
    }
    return true;
  };


  const FormHandlerLogin= async (e)=>{
    e.preventDefault();
    if (validation()){
        console.log('before try')
        try{
            const response =await axios.post(
                accountsapi+"accounts/reset-passsword/",form
            )
            console.log('after response')
            toast.success(response.data.message)
            console.log('after toast suc')

            setForm({password:'',cpassword:''})
            console.log('after setform')

            localStorage.removeItem("user_id")
            console.log('after removeitem')

            navigate("/login/")
            console.log('after navigate')
            
        }catch{
            toast.error("error occured while changing password ")
        }
    }
    
  }

  return (
    <>
    {/* {loading && <Loader/>} */}


  <Card className="bg-gray-100 h-screen">
<CardBody className='grid grid-cols-2 bg-white shadow-2xl rounded-lg w-[80rem] mt-32 ml-32 h-[35rem]'>
<div className="bg-cover flex items-center justify-center" >
  <img className='h-[30rem] m-5 w-[35rem]' src={Bloggingimg}  alt="Blog img" />
</div>
<div className="w-[30rem] h-[29rem] ml-20 flex items-center justify-center rounded shadow-2xl bg-white-100">
  <div className="bg-white p-8 rounded shadow-md w-96">
  <h2 className="text-2xl font-semibold text-center text-indigo-600">Reset Password</h2>
      <form className="mt-4" onSubmit={FormHandlerLogin}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">New Password</label>
          <input
        //   ref={emailInputRef}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="new password"
            name='password'
            value={form.password}
            onChange={(e)=>{
                console.log(form);
              setForm({...form,[e.target.name]:e.target.value})
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
          <input
        //   ref={passInputRef}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="confirm Password"
            name='cpassword'
            value={form.cpassword}
            onChange={(e)=>{
                console.log(form);
              setForm({...form,[e.target.name]:e.target.value})
            }}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Set Password
        </button>
      </form>
      <div className="text-center my-3">
              <p className="text-gray-600">Or</p>
            </div>
            
            <Link to='/login/'>
      <p className="text-center text-gray-600 mt-4">
        continue to login <span className="text-indigo-600">Login</span>
      </p>
            </Link>
  </div>
</div>

</CardBody>
</Card>

    </>
  )
}

export default ResetPassword
