import axios from "axios";

import { accountsapi,adminapi,blogsapi,premiumapi,aiurl } from "../constants/constants";



const CreateAxiosClient = (baseURL) =>{
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client
}


const attachToken = (req, tokenName) =>{
    let authToken = localStorage.getItem('token')
    const accesstoken = JSON.parse(authToken);
    if (accesstoken){
        req.headers.Authorization = `Bearer ${accesstoken.access}`;
    }
    return req
}


const UserAxiosInstant = CreateAxiosClient(accountsapi)
UserAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})

const AdminAxiosInstant=CreateAxiosClient(adminapi)
AdminAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

const BlogsAxiosInstant =CreateAxiosClient(blogsapi)
BlogsAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

const PremiumAxiosInstant=CreateAxiosClient(premiumapi)
PremiumAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

const GenerativeaiAxiosInstant = CreateAxiosClient(aiurl)
GenerativeaiAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq = attachToken(req,'token')
    return modifiedReq
})


// // Add this to handle global errors
// const handleGlobalError = (error) => {
//     // Handle different types of errors
//     console.error("Axios Error:", error);
  
//     // Example: Redirect to login page on 401 Unauthorized
//     if (error.response && error.response.status === 401) {
//       window.location.replace("/login");
//     }
  
//     // Rethrow the error to maintain the promise chain
//     throw error;
//   };
  
//   // Apply the global error handler to each instance
//   UserAxiosInstant.interceptors.response.use((response) => response, handleGlobalError);
//   AdminAxiosInstant.interceptors.response.use((response) => response, handleGlobalError);
//   BlogsAxiosInstant.interceptors.response.use((response) => response, handleGlobalError);
//   PremiumAxiosInstant.interceptors.response.use((response) => response, handleGlobalError);
  

export {UserAxiosInstant,AdminAxiosInstant,BlogsAxiosInstant,PremiumAxiosInstant,GenerativeaiAxiosInstant}