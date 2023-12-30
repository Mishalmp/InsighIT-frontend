import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Alert,
  Avatar,
  Slider,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";

import Userico from "../../../assets/user2img.png";
import { UserWallet } from "../../../services/UserApi";

import WalletPre from "../../../components/premiumuser/Wallet/Wallet";



import { Loader } from "../../../components/Loading/Loader";
import { useSelector } from "react-redux";
function WalletAdmin() {

    const {userinfo} = useSelector((state)=>state.user)

    useEffect(()=>{
      document.title="InsighIT | Admin Wallet";
    },[])



  if (!userinfo) {
    return <Loader />;
  }

 

  return (

    <>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Wallet
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about Recent Wallet Transactions
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  // value={searchQuery}
                  // onChange={(e)=>setSearchQuery(e.target.value)}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        
        </CardHeader>
        <div className="ml-24 max-h-[38rem] hidescroll overflow-y-auto">
          <WalletPre user={userinfo} />
        </div>
        </>

  );
}

export default WalletAdmin;
