import React, { useEffect, useState, useRef } from "react";

import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import jwtDecode from 'jwt-decode'
// import userImage from "../assets/icons8-google.svg";
// import {accountsapi} from '../../constants/constants'
import userImage from'../../assets/icons8-google.svg'
import Bloggingimg from '../../assets/Sign up-bro.png'
import {useGoogleLogin} from '@react-oauth/google';
import { Loader } from "../../components/Loading/Loader";
import { UserGoogleSignup } from "../../services/UserApi";
import { jwtDecode } from "jwt-decode";
import NavBar from "../../components/Userside/NavBarhome/NavBar";
import { GetPremiuminfo } from '../../services/PremiumApi';
import { UserSignin,UserGoogleSignin,GetUserInfo } from '../../services/UserApi';
import { setUserInfo,setPremiumUserInfo } from '../../Redux/UserSlice';
import { useDispatch } from 'react-redux';
// Redux
import {
  Card,CardBody,

} from "@material-tailwind/react";
function Signup() {
  const navigate=useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const message=new URLSearchParams(location.search).get("message")
  const [loading,setLoading]=useState(false)
  const [user,setUser]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
  })

  const [cpass,setCpass]=useState({cpassword:'',check:true})
  const [guser,setGuser]=useState();

  useEffect(()=>{
    if(message){
      toast.error(message)
    }
  },[message])


  useEffect(()=>{
    document.title="InsighIT | Signup";
    const GoogleAuth=async ()=>{
      try{
        if (!guser) return;

        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
          {
            headers:{
              Authorization:`Bearer ${guser.access_token}`,
              Accept:"application/json",
            },
          }
        )
        const res = await UserGoogleSignup(response.data);
        toast.success(res.data.msg);
        setGuser([])

        const token = JSON.stringify(res.data.token)
        const decoded = jwtDecode(token)
        fetchUserInfo(decoded)
        localStorage.setItem("token",token)

        if (decoded.role === 'user'){
          if (decoded.is_active){
            navigate('/user/Home/')

          }else{
            toast.error("Your account is not active ,please try again later")
          }

        }
      }catch(error){
        if (
          error.response &&
          error.response.data &&
          error.response.data.email

        ){
          toast.error(error.response.data.email[0])
        }else{
          toast.error("An error occured during registration")
        }
      }
    }
    if (guser){
      GoogleAuth()
    }
  },[guser]);

  const fetchUserInfo=async (token) =>{
    try{
      const id =token.id
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
      const pre=await GetPremiuminfo(id)
     
      dispatch(setPremiumUserInfo({
        premiumuserinfo:pre.data
      }))
      console.log(Userinfo,'userinfo')
    
    }
    catch{
      toast.error("error occured!!!")
    }
  }






  const isValidEmail = (email)=>{
    const regex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  const handleLoading=()=>setLoading((cur)=>!cur)

  const ValidateForm=()=>{
    
    if (user.first_name.trim() === ""){
    

      toast.error("First name should not be empty");
      return false;
    }

    else if (user.last_name.trim() === ""){
      toast.error("Last name should not be empty");
      return false;
    }
    else if (isValidEmail(user.email.trim() === "")){
      toast.error("Email should not be empty");
      return false;
    }
    else if (user.password.trim() === ""){
      toast.error("password should not be empty");
      return false;
    }

    else if (user.password.trim().length < 6){
      toast.warn('password atleast 6 chars')
      return false;
    }

    else if (cpass.cpassword !== user.password){
      toast.error('passwords didnt match')
      return false;
    }

    else if(!cpass.check){
      toast.error("Checkbox should be checked");
      
      return false;
    }
  
    return true
  }

  const FormHandlerSignup = async (e)=> {

    console.log(user,'1111111111111')
    e.preventDefault();
    if (ValidateForm()){
      handleLoading()
      console.log(user,'2222244444444444442')
      try{
        const response = await axios.post(
          'http://127.0.0.1:8000/accounts/register/',
          user

          
        )
        console.log(response.data,'2222222');
    

        setUser({
          first_name:"",
          last_name:"",
          email:"",
          password:"",
         

        })

        setCpass({cpassword:"",check:true})
        handleLoading()
        toast.success("An email send for verification!!")
        // navigate('/login/')


      }catch(error){
        handleLoading()
        if (error.response && error.response.data){
          const errordata = error.response.data
          if (errordata.email){
            alert(errordata.email[0])
          }else{
            console.log(error.response,'response')
            console.log(error.response.data,'dataerror')
            alert("an error occures during registration")
          }
        }
      }
    }


  }


  const handleGoogleLogin=useGoogleLogin({
    onSuccess:(codeResponse)=>{
      setGuser(codeResponse);
      GoogleAuth();
    },
    onError:(error)=>console.log("login failed",error)
  })




    // Google signIn button design
    const customGoogleSignupButton = (
      <button
        type="button"
        className="flex items-center bg-light px-4 py-2 rounded"
        onClick={handleGoogleLogin}
      >
        <img
          src={userImage}
          alt="Google logo"
          className="google-logo img-fluid"
          width="22"
          height="22"
        />
        <span className="button-text ms-2">Continue with Google</span>
      </button>
    )


  return (
    <>
    {loading && <Loader />}
   
   
    <Card className="bg-gray-100 h-screen">
<CardBody className='grid grid-cols-2 bg-white shadow-2xl rounded-lg w-[80rem] mt-20 ml-32 h-[40rem]'>
     <div className="bg-cover flex items-center justify-center" >
    <img className='h-[30rem] m-5 w-[35rem]' src={Bloggingimg} alt="Blog img" />
    </div>
      <div className="bg-white w-[30rem] h-[36rem] ml-10 mt-2 p-8 rounded shadow-2xl">
       
          <h2 className="text-2xl font-semibold text-center text-indigo-600">Sign Up</h2>
          <form className="mt-4" onSubmit={FormHandlerSignup}>
          <div className="mb-4">
            <div class="relative h-11 w-full min-w-[200px]">
        <input
        type="text"
        name='first_name'
        value={user.first_name}
        onChange={(e)=>{
          setUser({...user,[e.target.name]:e.target.value})
        }}
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "
        />
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          First Name
        </label>
      </div>
          </div>
          <div className="mb-4">
          <div class="relative h-11 w-full min-w-[200px]">
        <input
        name='last_name'
        value={user.last_name}
        onChange={(e)=>{
          setUser({...user,[e.target.name]:e.target.value})
        }}
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "
        />
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Last Name
        </label>
      </div>
          </div>
          <div className="mb-4">
          <div class="relative h-11 w-full min-w-[200px]">
        <input
        type="email"
        
        name='email'
        value={user.email}
        onChange={(e)=>{
          setUser({...user,[e.target.name]:e.target.value})
        }}
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "
        />
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Email
        </label>
      </div>
          </div>

          <div className="mb-4">
          <div class="relative h-11 w-full min-w-[200px]">
        <input
        name='password'
        type="password"
        value={user.password}
        onChange={(e)=>{
          setUser({...user,[e.target.name]:e.target.value})
        }}
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "
        />
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Password
        </label>
      </div>
            </div>
            <div className="mb-4">
            <div class="relative h-11 w-full min-w-[200px]">
        <input
        type="password"
        name='cpassword'
        value={cpass.cpassword}
        onChange={(e)=>{
          setCpass({...cpass,[e.target.name]:e.target.value})
        }}
          class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeHolder=" "
        />
        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Confirm Password
        </label>
      </div>
            </div> 
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Sign Up
          </button>
          </form>
          <div className="text-center my-3">
              <p className="text-gray-600">Or</p>
            </div>
            <div className="text-center ml-[25%]" >
              {customGoogleSignupButton}
            </div>
          <Link to='/login/'>
      <p className="text-center text-gray-600 mt-4">
        Already have account <a className="text-indigo-600">Login</a>
      </p>
            </Link>
        </div>
     
    </CardBody>
    </Card>

    </>
  );
}
export default Signup;
