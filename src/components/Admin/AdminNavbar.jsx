import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
    Avatar,Badge
  } from "@material-tailwind/react";
  import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
  import NotificationDrawer from "../NotificationDrawer/NotificationDrawer";
import { jwtDecode } from "jwt-decode";
import { GetUserInfo } from "../../services/UserApi";
import { Loader } from "../Loading/Loader";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

  export default function AdminNavbar() {

    const {userinfo} = useSelector((state)=>state.user)


  if (!userinfo) {
    return <Loader />;
  }

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

    return (
      <Navbar
        variant="gradient"
        color="blue-gray"
        className="mx-auto max-h-20 p-5 mt-2  max-w-screen-xl bg-white"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
          
          {/* <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Type here..."
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div> */}
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <Cog6ToothIcon className="h-4 w-4" />
            </IconButton>
            <IconButton variant="text" color="white" onClick={()=>setIsNotificationDrawerOpen(true)}>
            <Badge> <BellIcon className="h-4 w-4" /></Badge>
            </IconButton>
            <Avatar
            variant="circular"
            size="sm"
            alt="Admin"
            className="border border-gray-900 p-0.5 hover:bg-gray-100"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          </div>
       
        </div>

        <NotificationDrawer isOpen={isNotificationDrawerOpen} userinfo={userinfo} onClose={()=>setIsNotificationDrawerOpen(false)}  />
      </Navbar>
    );
  }