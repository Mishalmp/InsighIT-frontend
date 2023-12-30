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

import { TrendingUsers, Followingslist } from "../../services/UserApi";
import { TrendingTopics } from "../../services/BlogsApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Sidebar() {
  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.user);

  const [premiumlist, setPremiumlist] = useState([]);
  const [trendingtopics, settrendingtopics] = useState([]);
  const [followingslist, setfollwoingslist] = useState([]);

  const fetchPremiumList = async () => {
    try {
      const res = await TrendingUsers();
      setPremiumlist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollowingsList = async () => {
    try {
      const res = await Followingslist(userinfo.id);
      setfollwoingslist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchtopics = async () => {
    try {
      const ress = await TrendingTopics();
      settrendingtopics(ress.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPremiumList();
    fetchFollowingsList();
    fetchtopics();
  }, []);

  const [openAlert, setOpenAlert] = useState(true);

  return (
    <div className="w-[24rem] float-right ml-[5rem] h-[98rem] mt-5 shadow-2xl rounded-md mr-1  bg-gray-100">
      <Card className=" m-3 mt-5 bg-white shadow-2xl">
        <Typography
          variant="h5"
          color="deep-purple"
          className="m-5 ml-12 text-center"
        >
          Trending Topics
        </Typography>

        <CardBody>
          <ul className="grid grid-cols-2 gap-2 ">
            {trendingtopics.length > 0 ? (
              trendingtopics.map((topic) => (
                <li className="bg-green-200 w-auto  h-[2.3rem] flex justify-center items-center text-blue-900  rounded-lg">
                  {topic.topic}{" "}
                </li>
              ))
            ) : (
              <p>no topics</p>
            )}
          </ul>
        </CardBody>
      </Card>
      <Alert
        open={openAlert}
        className="mt-4 w-[22rem] ml-4 bg-[#c4e2ff] text-black"
        onClose={() => setOpenAlert(false)}
      >
        <Typography variant="h5" className="mb-1">
          Writing on InsighIT
        </Typography>
        <Typography className="mt-4 tracking-wider text-md opacity-80">
          New writer FAQ
        </Typography>
        <Typography className="tracking-wider text-md opacity-80">
          Expert writing advice
        </Typography>
        <Typography className=" tracking-wider text-md opacity-80">
          Grow your readership
        </Typography>
        <div className="mt-6 flex gap-3">
          {/* <Typography
         
           
            className="font-medium opacity-80 hover:cursor-pointer"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography> */}
          <div className="bg-[#191919] -mt-1 h-8 w-32 text-center hover:cursor-pointer text-white rounded-2xl">
            <Typography
              className="font-medium  mt-[4px]"
              onClick={() => navigate("/User/usercreateblog/")}
            >
              Start Writing
            </Typography>
          </div>
        </div>
      </Alert>
      {followingslist.length > 0 && (
        <Card className=" m-3 mt-5 bg-white shadow-2xl">
          <Typography
            variant="h5"
            color="deep-purple"
            className="m-5 ml-12 text-center"
          >
            Your followings
          </Typography>

          <CardBody className="min-h-[20rem] hidescroll max-h-[28rem] overflow-y-auto">
            <ul className="grid grid-cols-1 gap-2 ">
              {followingslist.map((premium) => (
                <div
                  key={premium.id}
                  role="button"
                  className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                  onClick={() =>
                    navigate(`/User/authorprofile/`,{state:{authorId:premium.following.id}})
                  }
                >
                  <div className="grid mr-4 place-items-center">
                    {premium.following.profile_img ? (
                      <img
                        alt="candice"
                        src={premium.following.profile_img}
                        className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                      />
                    ) : (
                      <svg
                        className="relative inline-block h-12 w-12 !rounded-full object-cover object-center text-gray-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-col">
                    <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                      {premium.following.first_name +
                        " " +
                        premium.following.last_name}{" "}
                      {premium.following.is_premium && (
                        <VerifiedIcon
                          color="primary"
                          fontSize="small"
                          className="-mt-1 ml-2"
                        />
                      )}
                    </h6>
                    <p className="text-gray-700 text-md font-serif">
                      {premium.following.email}
                    </p>
                    <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                      {premium.following.tag_name}
                    </p>
                  </div>
                </div>
              ))}

              <div
                // key={premium.id}
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <div className="grid mr-4 place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex-col">
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Ashiq Parammel{" "}
                    <VerifiedIcon
                      color="primary"
                      fontSize="small"
                      className="-mt-1 ml-2"
                    />
                  </h6>
                  <p className="text-gray-700 text-md font-serif">
                    ashiqparammel@gmail.com
                  </p>
                  <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                    web developer
                  </p>
                </div>
              </div>

              <div
                // key={premium.id}
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <div className="grid mr-4 place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex-col">
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Ashiq Parammel{" "}
                    <VerifiedIcon
                      color="primary"
                      fontSize="small"
                      className="-mt-1 ml-2"
                    />
                  </h6>
                  <p className="text-gray-700 text-md font-serif">
                    ashiqparammel@gmail.com
                  </p>
                  <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                    web developer
                  </p>
                </div>
              </div>
              <div
                // key={premium.id}
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <div className="grid mr-4 place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex-col">
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Ashiq Parammel{" "}
                    <VerifiedIcon
                      color="primary"
                      fontSize="small"
                      className="-mt-1 ml-2"
                    />
                  </h6>
                  <p className="text-gray-700 text-md font-serif">
                    ashiqparammel@gmail.com
                  </p>
                  <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                    web developer
                  </p>
                </div>
              </div>

              <div
                // key={premium.id}
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              >
                <div className="grid mr-4 place-items-center">
                  <img
                    alt="candice"
                    src="https://docs.material-tailwind.com/img/face-1.jpg"
                    className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex-col">
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Ashiq Parammel{" "}
                    <VerifiedIcon
                      color="primary"
                      fontSize="small"
                      className="-mt-1 ml-2"
                    />
                  </h6>
                  <p className="text-gray-700 text-md font-serif">
                    ashiqparammel@gmail.com
                  </p>
                  <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                    web developer
                  </p>
                </div>
              </div>
            </ul>
          </CardBody>
        </Card>
      )}

      <Card className=" m-3 mt-5 bg-white shadow-2xl">
        <Typography
          variant="h5"
          color="deep-purple"
          className="m-5 ml-12 text-center"
        >
          Trending Author
        </Typography>

        <CardBody className="min-h-[20rem] hidescroll max-h-[28rem] overflow-y-auto">
          <ul className="grid grid-cols-1 gap-2">
            {premiumlist.map((premium) => (
              <div
                key={premium.id}
                role="button"
                className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                onClick={() => {
                  if (premium.id === userinfo.id) {
                    navigate("/User/userprofile");
                  } else {
                    navigate(`/User/authorprofile/`,{state:{authorId:premium.id}});
                  }
                }}
              >
                <div className="grid mr-4 place-items-center">
                {premium.profile_img?(
                 <img
                 alt="candice"
                 src={
                   premium.profile_img
                    }
                 className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
               />
          ):(
            <svg
            className="relative inline-block h-12 w-12 !rounded-full object-cover object-center text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          )

          }
                </div>
                <div className="flex-col">
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    {premium.first_name + " " + premium.last_name}{" "}
                    <VerifiedIcon
                      color="primary"
                      fontSize="small"
                      className="-mt-1 ml-2"
                    />
                  </h6>
                  <p className="text-gray-700 text-md font-serif">
                    {premium.email}
                  </p>
                  <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                    {premium.tag_name}
                  </p>
                </div>
              </div>
            ))}

            <div
              // key={premium.id}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Ashiq Parammel{" "}
                  <VerifiedIcon
                    color="primary"
                    fontSize="small"
                    className="-mt-1 ml-2"
                  />
                </h6>
                <p className="text-gray-700 text-md font-serif">
                  ashiqparammel@gmail.com
                </p>
                <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                  web developer
                </p>
              </div>
            </div>

            <div
              // key={premium.id}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Ashiq Parammel{" "}
                  <VerifiedIcon
                    color="primary"
                    fontSize="small"
                    className="-mt-1 ml-2"
                  />
                </h6>
                <p className="text-gray-700 text-md font-serif">
                  ashiqparammel@gmail.com
                </p>
                <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                  web developer
                </p>
              </div>
            </div>
            <div
              // key={premium.id}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Ashiq Parammel{" "}
                  <VerifiedIcon
                    color="primary"
                    fontSize="small"
                    className="-mt-1 ml-2"
                  />
                </h6>
                <p className="text-gray-700 text-md font-serif">
                  ashiqparammel@gmail.com
                </p>
                <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                  web developer
                </p>
              </div>
            </div>

            <div
              // key={premium.id}
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg bg-gray-50 outline-none text-start hover:bg-blue-gray-100 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            >
              <div className="grid mr-4 place-items-center">
                <img
                  alt="candice"
                  src="https://docs.material-tailwind.com/img/face-1.jpg"
                  className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                />
              </div>
              <div className="flex-col">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Ashiq Parammel{" "}
                  <VerifiedIcon
                    color="primary"
                    fontSize="small"
                    className="-mt-1 ml-2"
                  />
                </h6>
                <p className="text-gray-700 text-md font-serif">
                  ashiqparammel@gmail.com
                </p>
                <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                  web developer
                </p>
              </div>
            </div>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default Sidebar;
