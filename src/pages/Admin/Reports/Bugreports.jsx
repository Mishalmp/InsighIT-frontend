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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    
  } from "@material-tailwind/react";
  import { MagnifyingGlassIcon,ArrowDownTrayIcon } from "@heroicons/react/24/outline";
  import { PencilIcon } from "@heroicons/react/24/solid";

import { timeAgo } from '../../../helpers/Timemanage';
import { ListIssues,IssueReportView,Updateissue } from '../../../services/UserApi';
import VerifiedIcon from "@mui/icons-material/Verified";

function Bugreports() {

    const [reports,setreports]=useState([])

    const [selectedreport,setselectedreport]=useState(null)
    const [isOpen,setOpen]=useState(false)

    

    const fetchreports = async()=>{
        try {

            const response =  await ListIssues()
            setreports(response.data)
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
      document.title="InsighIT | Report";
        fetchreports()
    },[])

    const handleclick = async(id)=>{
        try {
            const ress = await IssueReportView(id)
            setselectedreport(ress.data)

            setOpen(true)
            
        } catch (error) {
            console.error(error);
        }

    }

  return (
<>
    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
               Reported Issues
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last reported issues
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
      <div className="w-[62rem] rounded-lg mt-10 h-[45rem] hidescroll  overflow-y-auto min-h-[30rem] bg-white shadow-2xl ">
          <p className="text-5xl text-center font-serif"> Reported issues</p>

          {reports.length > 0 ? (
            reports.map((issue)=>(
                <div onClick={()=>handleclick(issue.id)} className="w-[45rem] ml-[12rem] bg-white gap-8 hover:cursor-pointer hover:bg-gray-200 h-24 mt-5 flex rounded-lg shadow-2xl">
                <p className="mt-8 ml-10 w-[20rem] font-semibold text-sm">
                  {" "}
                  {issue.issue}
                </p>
  
                <p className="text-xs mt-10 text-gray-500">{timeAgo(issue.created_at)} </p>
                <p className={`${issue.is_fixed?"bg-green-100  text-blue-800":"bg-red-100 text-red-800"}   w-24 text-md font-semibold  justify-center items-center mt-9 ml-8 h-[1.6rem] flex rounded-md`}>
                  {issue.is_fixed?'Fixed':'Not fixed' }
                </p>
              </div>
            ))
          
          ) : (
            <Typography variant="h3" className="text-center">
              No issues Found
            </Typography>
          )}

    
        </div>


   


    <Dialog open={isOpen} handler={()=>setOpen(false)}>
      <DialogHeader>Report Details</DialogHeader>
      <DialogBody className="overflow-scroll h-[30rem]">
      <div
              role="button"
              className="items-center flex justify-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src={`${
                    selectedreport?.user.profile_img
                      ? selectedreport?.user.profile_img
                      : "https://docs.material-tailwind.com/img/face-1.jpg"
                  }`}
                  className="relative inline-block h-14 w-14 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h3 className="block font-sans  text-lg antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  {selectedreport?.user.first_name +
                    " " +
                    selectedreport?.user.last_name}
                  <VerifiedIcon
                    color="primary"
                    fontSize="medium"
                    className="-mt-1 ml-2"
                  />
                </h3>
                <p className="block font-sans  text-sm antialiased text-center font-normal leading-normal text-blue-gray-700">
                  <p className="text-gray-700 text-md text-center font-serif">
                    {selectedreport?.user.email}
                  </p>
                  {selectedreport?.user.tag_name}
                </p>
              </div>
            </div>
        <Typography variant="h6" color="blue-gray" className='mt-20 ml-10 mr-10' >
         {selectedreport?.issue}
        </Typography>
      </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={()=>setOpen(false)}>
            cancel
          </Button>
          {!selectedreport?.is_fixed?
          (<Button variant="gradient" color="green" onClick={async()=>{
            await Updateissue(selectedreport.id,{is_fixed:true})
            setOpen(false)
          }}>
            Fixed
          </Button>)
        :(
    ''

        )
          }
          
        </DialogFooter>
      </Dialog>
      </>
  )
}

export default Bugreports
