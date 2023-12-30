import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Signup from './pages/User/Signup'
import LoginPage from './pages/User/LoginPage'
import ForgotPassword from './pages/User/ForgotPassword'
import ResetPassword from './pages/User/ResetPassword'
// import { Button } from "@material-tailwind/react";

import PrivateRoutes from './routes/ProtectedRoutes/PrivateRoutes'
import UserRoutes from './routes/User'
import AdminRoutes from './routes/AdminRoutes'
import { ToastContainer } from 'react-toastify'
import { Helmet } from 'react-helmet-async';
import insighticon from '../src/assets/bginsight.png'
function App() {
  
  return (
    <>
      {/* <Helmet> */}
      {/* <link rel="icon" href={insighticon} /> */}
    <ToastContainer/>
      <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>

            <Route path='/login/' exact element={<LoginPage/>}/>
            <Route path='/signup/' exact element={<Signup/>}/>
            <Route path='/forgotpassword/' exact element={<ForgotPassword/>}/>
            <Route path='/resetpassword/' exact element={<ResetPassword/>}/>
            </Route>

            <Route path='/User/*'  element={<UserRoutes/>}/>
            <Route path='/admin/*' element={<AdminRoutes/>}/>
                {/* Catch-all route for 404 */}
            <Route path='*' element={<LoginPage />} />

          </Routes>
  

      </Router>
      {/* </Helmet> */}
  
    </>
  )
}

export default App
