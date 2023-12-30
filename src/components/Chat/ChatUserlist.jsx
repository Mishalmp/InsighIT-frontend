import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  // Card,
  // CardHeader,
  Input,
  Typography,
  // Button,
  // CardBody,
  // Chip,
  // CardFooter,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Avatar,
  // IconButton,
  // Tooltip,
} from "@material-tailwind/react";
import Userico from "../../assets/user2img.png";
import NavBar from "../Userside/NavBar/NavBar";
import Footer from "../Userside/footer/footer";

import { ChatUsersList } from "../../services/UserApi";
import { Loader } from "../Loading/Loader";
function ChatUserlist({ userinfo, setRecipientDetails }) {
  const [chatuser, SetChatusers] = useState(null);

  useEffect(() => {
    const Fetchchatusers = async () => {
      try {
        const response = await ChatUsersList(userinfo.id);

        SetChatusers(response.data.chat_users);
      } catch (error) {
        console.error(error);
      }
    };
    Fetchchatusers();
  }, [userinfo]);

  if (!chatuser) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-1/3 h-[41rem] hidescroll bg-gray-50 border-[1px] border-gray-400">
        <div className="flex ml-10 mt-6 justify-between mr-10 mb-10">
          <Typography variant="h2">Chats</Typography>

          <div className="w-56 justify-end">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>

        <div className="mb-5 mt-5 ml-2">
          {chatuser.length > 0 ? (
            chatuser.map((user) => (
              <div
                key={user.id}
                onClick={() => setRecipientDetails(user)}
                className="w-[30rem] bg-white gap-8 hover:cursor-pointer hover:bg-gray-200 h-16 mt-2 grid grid-cols-4 rounded-lg shadow-md shadow-gray-300"
              >
                {user.profile_img ? (
                  <img
                    src={user.profile_img}
                    className="w-10 h-10 rounded-full mt-3 ml-2"
                    alt="user_img"
                  />
                ) : (
                  <svg
                    className="w-10 h-10 rounded-full mt-3 ml-2 text-gray-300 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                )}
                <p className="mt-6 -ml-10 font-semibold text-sm">
                  {user.first_name + " " + user.last_name}
                </p>

                <p className="text-xs mt-6 text-gray-500">21 12 2023</p>
              </div>
            ))
          ) : (
            <Typography
              variant="h4"
              className="flex justify-center items-center mt-5"
            >
              No Connections founds
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatUserlist;
