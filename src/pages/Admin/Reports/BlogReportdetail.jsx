import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/Admin/AdminNavbar'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import { MagnifyingGlassIcon,ArrowDownTrayIcon } from "@heroicons/react/24/outline";
  import { PencilIcon } from "@heroicons/react/24/solid";

import { timeAgo } from '../../../helpers/Timemanage';


function BlogReportdetail() {
  return (
    <div className='flex'>
    <AdminSidebar/>
    <Card className='h-2/3 w-2/3 ml-10'>
    <AdminNavbar/>
    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Blog Report
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>



    </Card>
    </div>
  )
}

export default BlogReportdetail
