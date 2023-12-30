import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import {Card} from "@material-tailwind/react";
import { Outlet } from 'react-router-dom'
function AdminLayout() {
  return (
    <div className="flex">
    <AdminSidebar />
    <Card className="h-2/3 w-2/3 ml-10">
      <AdminNavbar />

      <Outlet/>
        
      </Card>
      
    </div>
  )
}

export default AdminLayout
