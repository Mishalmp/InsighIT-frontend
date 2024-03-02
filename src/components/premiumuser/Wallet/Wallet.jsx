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
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Loader } from "../../../components/Loading/Loader";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import Userico from "../../../assets/user2img.png";
import { UserWallet } from "../../../services/UserApi";
import { timeAgo } from "../../../helpers/Timemanage";
import ConnectWallet from "./ConnectWallet";
function Wallet({ user }) {
  const [open, setOpen] = useState(false);
  const [totalrecieve, setTotalrecieve] = useState(null);
  const [totalwithdraw, setWithdraw] = useState(null);
  const [openwallet,setOpenwallet]=useState(false)

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const FetchWallet = async () => {
      try {
        const response = await UserWallet(user.id);

        setTotalrecieve(response.data.total_recieved);
        setWithdraw(response.data.total_withdrawn);
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error(error);
      }
    };
    FetchWallet();
  }, []);
  
  return (
    <div className="hidescroll max-h-[48rem] overflow-y-auto max-w-screen-lg mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <h1 className="font-bold text-2xl text-center md:ml-72 lg:ml-64 md:text-center mb-4 md:mb-0">
        Wallet
      </h1>
      {/* Search input */}
    </div>
    <Card className="max-w-md hidescroll md:max-w-3xl mt-5 mx-auto bg-gray-50">
      <div className=" ml-10 mr-10 mt-10 mx-auto h-32 rounded-lg border-[1px] border-green-500 shadow-2xl shadow-gray-400">
        <Typography variant="h5" className="text-gray-500 mt-2 text-center">
          Your Wallet balance
        </Typography>
        <Typography variant="h2" className="text-green-600 mt-5 text-center">
          $ {user.wallet_balance}
        </Typography>
      </div>
      <button
        className=" w-40 mx-auto  mt-5  rounded-lg bg-blue-500 py-3 px-6 text-center font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => setOpenwallet(true)}
      >
        Withdraw
      </button>
      {/* Total Recieved and Total Withdrawn */}
      <div className="flex flex-col md:flex-row gap-8 hidescroll mt-5 mx-auto max-w-md md:max-w-4xl">
        <div className="w-full md:w-40">
          <Typography variant="h6" className="text-gray-500 text-center md:text-left">
            Total Recieved
          </Typography>
          <div className="w-full mt-2 h-16 flex gap-8 rounded-lg border-[1px] border-green-500 shadow-2xl shadow-gray-400">
            <div className="w-10 h-10 mt-3 flex justify-center items-center ml-2 rounded-full bg-green-200">
              <NorthEastIcon fontSize="large" className="text-green-600" />
            </div>
            <Typography variant="h6" className="text-green-600 mt-5 text-center">
              $ {totalrecieve}
            </Typography>
          </div>
        </div>
        <div className="w-full md:w-40">
          <Typography variant="h6" className="text-gray-500 text-center md:text-left">
            Total Withdrawn
          </Typography>
          <div className="w-full mt-2 h-16 flex gap-8 rounded-lg border-[1px] border-red-800 shadow-2xl shadow-gray-400">
            <div className="w-10 h-10 mt-3 flex justify-center items-center ml-2 rounded-full bg-red-300">
              <SouthWestIcon fontSize="large" className="text-red-800" />
            </div>
            <Typography variant="h6" className="text-red-800 mt-5 text-center">
              $ {totalwithdraw}
            </Typography>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <Typography variant="h5" className="text-gray-500 mt-8 mx-auto ">
        Transactions
      </Typography>
      <div className="mt-3 max-w-md mx-auto md:max-w-3xl">
        {transactions &&
          transactions.map((transaction, index) => (
            <div className="gap-8  h-12 mt-3 grid grid-cols-4 rounded-lg shadow-2xl shadow-gray-500">
                <img
                  src={Userico}
                  className="w-8 h-8 rounded-full mt-2 ml-2"
                  alt="user_img"
                />
                <p className="mt-3 -ml-10 font-semibold text-sm">
                  {transaction.recieved_from.first_name}{" "}
                  {transaction.recieved_from.last_name}{" "}
                </p>
                <p className="text-xs mt-4 text-gray-500">
                  {timeAgo(transaction.created_at)}
                </p>

                <Typography variant="h6" className="text-green-600 mt-3">
                  $ {transaction.recieved}
                </Typography>
              </div>
          ))}
      </div>
    </Card>
    <ConnectWallet openwallet={openwallet} setOpenwallet={setOpenwallet} />

      <Dialog size="md" open={open}>
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            Subscription Info
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid grid-cols-1 gap-4">
          <Typography variant="h6" color="blue-gray">
            Subscription Type:
          </Typography>
          <Typography variant="h6" color="blue-gray">
            Start date:
          </Typography>
          <Typography variant="h6" color="blue-gray">
            End date:
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray">
            close
          </Button>
          <Button variant="gradient">Ok, Got it</Button>
        </DialogFooter>
      </Dialog>

 
    </div>
  );
}

export default Wallet;
