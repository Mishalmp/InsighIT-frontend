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
} from "@material-tailwind/react";
import VerifiedIcon from "@mui/icons-material/Verified";
import Myslider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { TrendingUsers } from "../../../services/UserApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DefaultSkeleton } from "../../Skeletons/Usercard";

function Usercardlist() {
  const { userinfo } = useSelector((state) => state.user);
    const navigate = useNavigate()
  const [premiumlist, setPremiumlist] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const fetchPremiumList = async () => {
    try {
      const res = await TrendingUsers();
      setPremiumlist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        fetchPremiumList();
      }, 1000);
    };

    fetchDataWithDelay();
  }, []);

  return (
    <div className="">
      <div className="flex gap-4 mt-32 ">

      <WhatshotIcon fontSize="large" />
        <Typography variant="h4" className="">Trending Authors</Typography>
      </div>
    <div
      className="flex flex-wrap overflow-x-hidden mt-10 justify-start gap-10 hidescroll"
    >

      {showSkeleton ? (
            <>
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
           
            </>
          ):(

      premiumlist.map((premium, index) => (
        <Card
          className={`w-[18rem] h-[20rem] m-2 bg-[#eff5fb] hover:bg-gray-100 cursor-pointer shadow-xl${
            index < premiumlist.length - 1 ? " mr-2" : ""
          }`}
          key={premium.id}
        >
          {premium.profile_img?(
                 <img
                 alt="candice"
                 src={
                   premium.profile_img
                    }
                 className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
               />
          ):(
            <svg
            className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          )

          }
     
          <div className="ml-5 mt-5">
            <Typography variant="h6" color="blue-gray" className="mb-2 ">
              {premium.first_name + " " + premium.last_name}{" "}
              <VerifiedIcon
                fontSize="small"
                className="-mt-1 ml-1"
                color="primary"
              />
            </Typography>
            <p className="text-base -mt-2 text-gray-600 font-serif">
              {premium.tag_name}
            </p>
          </div>
          <div className="flex gap-6 ml-5 -mb-4">
                <Typography className="mt-2 font-semibold text-md text-blue-800">
                  {premium.followers_count} Followers
                </Typography>
                <Typography className="mt-2  font-semibold text-md text-blue-800">
                  {premium.followings_count} Following
                </Typography>
              </div>
          <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-8 ">
            {premium.bio && premium.bio.substring(0, 70) + "..."}
          </p>

          <div
            className="w-40 h-8 mt-2 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700"
            onClick={() => {
              if (premium.id === userinfo.id) {
                navigate("/User/userprofile");
              } else {
                navigate(`/User/authorprofile/`,{state:{authorId:premium.id}});
              }
            }}
          >
            <p className="text-white text-center mt-[0.2rem]  text-lg">
              View Profile
            </p>
          </div>
        </Card>
      )))}

{/* <Card className="w-[18rem] h-[20rem] bg-[#eff5fb] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
        <img
          alt="candice"
          src="https://docs.material-tailwind.com/img/face-1.jpg"
          className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
        />
        <div className="ml-5 mt-5">
          <Typography variant="h6" color="blue-gray" className="mb-2 ">
            Mishal Mp
            <VerifiedIcon
              fontSize="small"
              className="-mt-1 ml-1"
              color="primary"
            />
          </Typography>
          <p className="text-base -mt-2 text-gray-600 font-serif">
            Web developer
          </p>
        </div>
        <div className="flex gap-6 ml-5 -mb-4">
                <Typography className="mt-2 font-semibold text-md text-blue-800">
                  100 Followers
                </Typography>
                <Typography className="mt-2  font-semibold text-md text-blue-800">
                  50 Following
                </Typography>
              </div>

        <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-8 ">
          Web developer wormisdf asdnlasd asdljn zdfg dfgsdfg xdfgxdfg zff...
        </p>
    

        <div className="w-40 h-8 mt-2 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-[0.2rem] text-lg">View Profile</p>
        </div>
      </Card>

      <Card className="w-[18rem] h-[20rem] bg-[#eff5fb] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
        <img
          alt="candice"
          src="https://docs.material-tailwind.com/img/face-1.jpg"
          className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
        />
        <div className="ml-5 mt-5">
          <Typography variant="h6" color="blue-gray" className="mb-2 ">
            Mishal Mp
            <VerifiedIcon
              fontSize="small"
              className="-mt-1 ml-1"
              color="primary"
            />
          </Typography>
          <p className="text-base -mt-2 text-gray-600 font-serif">
            Web developer
          </p>
        </div>
        <div className="flex gap-6 ml-5 -mb-4">
                <Typography className="mt-2 font-semibold text-md text-blue-800">
                  100 Followers
                </Typography>
                <Typography className="mt-2  font-semibold text-md text-blue-800">
                  50 Following
                </Typography>
              </div>

        <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-8 ">
          Web developer wormisdf asdnlasd asdljn zdfg dfgsdfg xdfgxdfg zff...
        </p>
    

        <div className="w-40 h-8 mt-2 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-[0.2rem] text-lg">View Profile</p>
        </div>
      </Card> */}

   


     
    </div>

    </div>
  );
}

export default Usercardlist;
