import React from 'react'
import { jwtDecode } from 'jwt-decode'
import HomePage from '../../pages/HomePage'
import AdminHomePage from '../../pages/Admin/AdminHomePage'
import { Outlet } from 'react-router-dom'

function PrivateRoutes() {
    const token = localStorage.getItem('token')

    if (token){
        const decode =jwtDecode(token)
        if (decode.role === 'user'){
            return <HomePage/>

        }else if(decode.role === 'admin'){
            return <AdminHomePage/>
        }
    }
    else{
        return <Outlet/>
    }
  
}

export default PrivateRoutes
