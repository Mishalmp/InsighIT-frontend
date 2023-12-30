import React, { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom'
import LoginPage from "../pages/User/LoginPage"
import Signup from "../pages/User/Signup"
import ForgotPassword from "../pages/User/ForgotPassword"
import ResetPassword from "../pages/User/ResetPassword"
import UserProtected from "./ProtectedRoutes/UserProtected"
import PrivateRoutes from "./ProtectedRoutes/PrivateRoutes"
import HomePage from "../pages/HomePage"
import Blogs from "../pages/User/Blogs/Blogs"
import UserProfile from "../pages/User/Profile/UserProfile"

import UserBlogCreate from "../pages/User/Blogs/UserBlogCreate"
import Blogdetail from "../pages/User/Blogs/Blogdetail"
import MyBlogs from "../pages/User/Blogs/MyBlogs"
import EditBlog from "../pages/User/Blogs/EditBlog"
import Upgradationform from "../pages/PremiumUser.jsx/Upgradationform"

import Topics from "../pages/User/Topics"
import VideoCall from "../components/videocall/VideoCall"

import Paymentresult from "../components/Payment/Paymentresult"
import OtherProfile from "../pages/User/Profile/OtherProfile/OtherProfile"
import SavedBlogs from "../pages/User/Blogs/SavedBlogs"

import Chat from "../pages/User/Chat/Chat"
import Community from "../pages/User/Community/Community"

import ReportIssue from "../pages/User/ReportIssue/ReportIssue"

import PagenotFound from '../pages/UnknownUser/UnknownUser'




import About from "../pages/User/About"

import UserLayout from "./layouts/UserLayout"

function UserRoutes() {
    
   
    // const [socket, setSocket] = useState(null
    

    return(
     <Routes>
        
        <Route exact element={<PrivateRoutes/>}>
            <Route path="/login"  element={<LoginPage/>} />
            <Route path="/signup"  element={<Signup/>} />
            <Route path="/forgotpassword"  element={<ForgotPassword/>} />
            <Route path="/resetpassword"  element={<ResetPassword/>} />

        </Route>

        <Route exact element={<UserProtected/>}>
        <Route exact element={<UserLayout/>}>
            <Route path="/Home/" element={<HomePage/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/topics" element={<Topics/>} />

            <Route path="/userprofile" element={<UserProfile/>}/>
           
            <Route path="usercreateblog" element={<UserBlogCreate/>}/>
            <Route path="detailblog/" element={<Blogdetail/>}/>
            <Route path="myblogs/" element={<MyBlogs/>}/>
            <Route path="saved/" element={<SavedBlogs/>}/>
            <Route path="editblog/" element={<EditBlog/>}/>
            <Route path="/videocall" element={<VideoCall/>}/>    
          
            <Route path="about/" element={<About/>}/>     
            <Route path="reportissue/" element={<ReportIssue/>}/>    
            <Route path="community/" element={<Community/>}/>    
            <Route path="chat/" element={<Chat/>}/>
            <Route path="result/" element={<Paymentresult/>}/>
            <Route path="upgradeform/" element={<Upgradationform/>}/>
            <Route path="authorprofile/" element={<OtherProfile/>}/>
          
            
        </Route>
        </Route>
        <Route path='*' element={<PagenotFound />} />
        
        </Routes>
    )
}

export default UserRoutes   