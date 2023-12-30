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
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../../../helpers/Timemanage';
import { GetPremiuminfolist } from '../../../services/PremiumApi';

function PremiumRequest() {

    const [premiuminfos,setPremiuminfos]=useState([])
    const navigate=useNavigate()
    const [searchQuery,setSearchQuery]=useState("")
    const [selectedfilter,setSelectedfilter]=useState("")

    const FetchRequest=async()=>{
        try {
            const res = await GetPremiuminfolist(searchQuery,selectedfilter)
            setPremiuminfos(res.data)
           console.log(res.data,'preeeemiummm resqqqqq')
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>{
      document.title="InsighIT | PremiumUsers";
        FetchRequest()
    },[searchQuery,selectedfilter])

    // console.log(premiuminfos,'preeeemiummm reeeeeeeeeeeeeee')
    const TABS = [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Inactive",
          value: "inactive",
        }];

    const TABLE_HEAD = ["User ", "Date", "Email","status", ""];
  return (
    <>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Recent Premium Request
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about Recent Premium Requests
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
      
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          
          </div>
        </div>
        <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={()=>setSelectedfilter(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
      </CardHeader>
      <CardBody className="h-[38rem] overflow-y-auto overflow-x-hidden hidescroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {premiuminfos.map(
              (
                premium,index
               
              ) => {
                const isLast = index === premiuminfos.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr  className='hover:cursor-pointer hover:bg-gray-100' onClick={()=>navigate(`/admin/premiumrequestview/`,{state:{premiumId:premium.id}})}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                         src={premium.user.profile_img}
                        alt='username'
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {premium.user.first_name+" "+premium.user.last_name}
                        </Typography>
                      </div>
                    </td>
                 
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {timeAgo(premium.created_at)}
                      </Typography>
                    </td>
                
                 

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {premium.user.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                         value={premium.is_approved?"Approved":"Not Approved"}
                          color={premium.is_approved?"green":"red"}
                        />
                      </div>
                    </td>
               
                    <td className={classes} >
                      <Tooltip content="View Request">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>

        {/* {selectedReport && (
        <ReportBlogModal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          report={selectedReport}
        />
      )} */}

      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm">
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
          <IconButton variant="text" size="sm">
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
</>
  )
}

export default PremiumRequest
