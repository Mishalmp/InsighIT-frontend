import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@material-tailwind/react";
import { Stepper, Step } from "@material-tailwind/react";
// import CheckoutForm from "../payment/PaymentCard";
import { Checkoutsession } from "../../../services/UserApi";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { GetPremiuminfobyUser } from "../../../services/PremiumApi";


function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}
function Bloghidepage({user_id,author_id}) {



  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen((cur) => !cur);
  const [activeTab, setActiveTab] = useState('basic');
  // const [selectedamount,setSelectedAmount]=useState('')
  // const [subscription_type,setSubscriptiontype]=useState('')

  const [premiuminfo,setPremiuminfo]=useState([])

  // console.log(user_id,author_id,'useeeeeeeeeeeeeeerrrrrrrrrr');


  useEffect(()=>{

    const Fetch_author_info=async()=>{

      try{

        const premium_info=await GetPremiuminfobyUser(author_id)
        setPremiuminfo(premium_info.data)
        console.log(premium_info.data,'premium info subdcribe');
       

      }catch{
        console.error(error)
      }
    }
    Fetch_author_info()


  },[])

 console.log(premiuminfo,'');

  const handleBuyNow = async (amount,subscription) => {

    // setSelectedAmount(amount);
    // setSubscriptiontype(subscription)

   
    
    var data = {
      "user_id" : user_id,
      "author_id" : author_id,
      "price" : parseInt(amount),
      'subscription_type':subscription,
      'subscription_amount':parseInt(amount),
      "origin_site" : window.location.origin+'/User/result/',
    }
    // console.log(data,'checkout data aaaaaaa');

    try{
      const session_res= await Checkoutsession(data)
      
      window.location.href=session_res.data.message.url
   

    }catch(error){
      console.error(error)
    }
    

  
  };

  const data = [
    {
      label: "Basic",
      value: "basic",
      icon: Square3Stack3DIcon,
   
    },
    {
      label: "Standard",
      value: "standard",
      icon: UserCircleIcon,
     
    },

  ];

  // console.log(activeTab,'activeeee')

  return (
    <div>
      <Dialog
        size="lg"
        open={open}
        onClose={() => setOpen(false)}
        className="bg-transparent shadow-none"
      >
        <div className="mx-auto bg-white w-full max-w-[50rem] rounded-lg p-4">
        <Tabs value={activeTab} >
        <TabsHeader>
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
                  <div className="flex items-center gap-2" >
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}

                    
                  </div>
                </Tab>
              ))}
            </TabsHeader>
      <TabsBody>
        {data.map(({ value}) => (
          <TabPanel key={value} value={value}>
            
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
     
          {activeTab === 'basic' && (
            <>
              <Typography variant="h2" className="text-center font-semibold">
                Choose One Plan
              </Typography>

              <Typography className="text-center max-w-28 mt-5 mb-5">
                You Can't read this blog. <br /> Please do subscribe this author
                to see their premium blogs
              </Typography>
              <div className="flex gap-5 ml-10">
                <Card
                  color="gray"
                  variant="gradient"
                  className="w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      Basic
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                    >
                      <span className="mt-2 text-xl">$</span>{premiuminfo.subscription_price_basic}
                      <span className="self-end text-xl">/mo</span>
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border -mt-5 border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Access all premium Blogs of this Author
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Get updates
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Chat Interaction 
                        </Typography>
                      </li>

                      <li className="flex items-center gap-4">
                        <span className=" p-1">
                        
                        </span>
                       
                      </li>
                    </ul>
                  </CardBody>
                  <CardFooter className="mt-12 p-0">
                    <Button
                      size="lg"
                      color="white"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                      onClick={()=>handleBuyNow(premiuminfo.subscription_price_basic,'basic_monthly')}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  color="gray"
                  variant="gradient"
                  className="w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      Basic
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                    >
                      <span className="mt-2 text-xl">$</span>{premiuminfo.sub_price_basic_yr}
                      <span className="self-end text-xl">/yr</span>
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border -mt-5 border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Access Premium Contents of this Author
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Get updates for 1 year
                        </Typography>
                      </li>
                    
                    </ul>
                  </CardBody>
                  <CardFooter className="mt-28 p-0">
                    <Button
                      size="lg"
                      color="white"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                      onClick={()=>handleBuyNow(premiuminfo.sub_price_basic_yr,'basic_yearly')}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>

              
              </div>
            </>
          )}
          {activeTab === 'standard' && (
            <>
              <Typography variant="h2" className="text-center font-semibold">
                Choose Monthly Or Yearly
              </Typography>

              <Typography className="text-center max-w-28 mt-5 mb-5">
                You have to choose your plan monthly or Yearly. <br /> Please do subscribe this author
                to see their premium blogs
              </Typography>

              <div className="flex gap-5 ml-10">
              <Card
                  color="gray"
                  variant="gradient"
                  className="w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      standard
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                    >
                      <span className="mt-2 text-xl">$</span>{premiuminfo.subscription_price_std}
                      <span className="self-end text-xl">/mo</span>
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                        Access all premium Blogs
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Get updates
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Chat Interaction 
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Access Live Session
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                  <CardFooter className="mt-12 p-0">
                    <Button
                      size="lg"
                      color="white"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                      onClick={()=>handleBuyNow(premiuminfo.subscription_price_std,'standard_monthly')}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  color="gray"
                  variant="gradient"
                  className="w-full max-w-[20rem] p-8"
                >
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
                  >
                    <Typography
                      variant="small"
                      color="white"
                      className="font-normal uppercase"
                    >
                      Standard
                    </Typography>
                    <Typography
                      variant="h1"
                      color="white"
                      className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                    >
                      <span className="mt-2 text-xl">$</span>{premiuminfo.sub_price_std_yr}
                      <span className="self-end text-xl">/yr</span>
                    </Typography>
                  </CardHeader>
                  <CardBody className="p-0">
                    <ul className="flex flex-col gap-4">
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border -mt-5 border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          Access All premium Content of this Author
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                           Get updates for 1 year
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                          <CheckIcon />
                        </span>
                        <Typography className="font-normal">
                          technical support
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                  <CardFooter className="mt-16 p-0">
                    <Button
                      size="lg"
                      color="white"
                      className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                      ripple={false}
                      fullWidth={true}
                      onClick={()=>handleBuyNow(premiuminfo.sub_price_std_yr,'standard_yearly')}
                    >
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          )}

        
        </div>
      </Dialog>
    </div>
  );
}

export default Bloghidepage;
