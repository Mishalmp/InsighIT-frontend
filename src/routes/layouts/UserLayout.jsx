import React from 'react'

import { Outlet,useLocation } from 'react-router-dom'
import NavBar from '../../components/Userside/NavBar/NavBar';
import NavBarHome from '../../components/Userside/NavBarhome/NavBar';
import Footer from '../../components/Userside/footer/footer';

function UserLayout() {

    const location = useLocation();

    const isHomePage = location.pathname === '/User/Home/' || location.pathname === '/User/about/'

  return (
    <>
    {isHomePage ? <NavBarHome/> : <NavBar/> }

    <Outlet/>
      
    <Footer/>
    </>
  )
}

export default UserLayout
