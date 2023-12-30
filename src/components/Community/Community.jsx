import React, { useEffect, useState } from "react";
import community_img from "../../assets/webdevs.jpg";
import { timeAgo } from "../../helpers/Timemanage";
import { useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { DeleteCommunity } from "../../services/BlogsApi";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateFollowing,
  Is_follower,
  Unfollow,IsSubscriber,NotificationCreate
} from "../../services/UserApi";
import Bloghidepage from "../premiumuser/premiumBlog/Bloghidepage";
import VerifiedIcon from "@mui/icons-material/Verified";
import { sendNotification } from "../../helpers/Notificationuser";
function CommunityCard({
  id,
  author,
 
  desc,
  time,
  image,
  tag_name,
  author_id,
  FetchCommunityposts,
  author_info
}) {
  const { userinfo } = useSelector((state) => state.user);

  const isAuthor = userinfo.id == author_id;
  const [is_following, setIs_following] = useState(false);
  const [is_subscriber, setIs_subscriber] = useState(false);
  const [showhidepage,setShowhidepage]=useState(false)

  const navigate = useNavigate();

  const handledeleteClick = async (id) => {
    try {
      await DeleteCommunity(id);
      toast.success("post deleted succussfully");
      FetchCommunityposts();
    } catch (error) {
      console.error(error);
      toast.error("failed to delete post");
    }
  };

  useEffect(()=>{
    const fetchData=async()=>{

    
    try {
      const res_follow = await Is_follower(userinfo.id, author_id);
      setIs_following(res_follow.data.is_follower);

      const res_sub=await IsSubscriber(userinfo.id, author_id)
      setIs_subscriber(res_sub.data.is_subscriber)
      
    } catch (error) {
      
    }
  }
  fetchData()



  },[is_following])

  // console.log(is_subscriber,author_info,'isssspremiumm,subscriberrrrrrrrr');



  const Handlefollow = async () => {

    const values = {
      follower: userinfo.id,
      following: author_id,
    };

    const notificationMessage = `${userinfo.first_name} started Follow You`

    const noti_values = {
      user: author_id,
      text: notificationMessage,
    };
 
    try {

      if(author_info.is_premium && !is_subscriber){
        
        setShowhidepage(true)
      }else{
      const resp = await CreateFollowing(values);

      

      toast.success("followed successfully");
      setIs_following(true);
      sendNotification(notificationMessage,author_id)
      await NotificationCreate(noti_values);

      }

      
    } catch (error) {
      console.error(error);
    }
  };
  

  const Handleunfollow = async () => {
    const notificationMessage = `${userinfo.first_name}  UnFollowed You`
    const noti_values = {
      user: author_id,
      text: notificationMessage,
    };
    try {
      const ress = await Unfollow(userinfo.id, author_id);
      toast.success("unfollowed successfully");
      setIs_following(false);
      sendNotification(notificationMessage,author_id)
      await NotificationCreate(noti_values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative m-20 mt-0 ml-32  flex w-full max-w-[40rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
      <div className="m-5">
        <div className="relative flex  items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-white shadow-none rounded-xl bg-clip-border">
          {author_info.profile_img?(
                      <img
                      src={author_info.profile_img}
                      alt={author}
                      className="relative inline-block h-[58px] w-[58px] !rounded-full cursor-pointer object-cover object-center"
                      onClick={() => {
                        if (isAuthor) {
                          navigate("/User/userprofile");
                        } else {
                          navigate(`/User/authorprofile/`,{state:{authorId:author_id}});
                        }
                      }}
                    />
          ):(
            <svg
            className="relative inline-block h-[58px] w-[58px] !rounded-full cursor-pointer  object-cover object-center text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            onClick={() => {
              if (isAuthor) {
                navigate("/User/userprofile");
              } else {
                navigate(`/User/authorprofile/`,{state:{authorId:author_id}});
              }
            }}
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          )

          }

          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <h5
                className="block font-sans text-xl antialiased cursor-pointer font-semibold leading-snug tracking-normal text-blue-gray-900"
                onClick={() => {
                  if (isAuthor) {
                    navigate("/User/userprofile");
                  } else {
                    navigate(`/User/authorprofile/`,{state:{authorId:author_id}});
                  }
                }}
              >
                {author} {author_info.is_premium && <VerifiedIcon color="primary" fontSize="small" className="-mt-1 ml-2" /> } 
              </h5>
              {!isAuthor && (
                <>
                  {is_following ? (
                    <span
                      onClick={Handleunfollow}
                      className="bg-green-100 w-24 cursor-pointer text-md font-semibold -ml-24 justify-center items-center mt-1 h-[1.6rem] flex text-blue-800  rounded-md"
                    >
                      following
                    </span>
                  ) : (
                    <span
                      className="bg-blue-800 w-20 text-md gap-1 cursor-pointer -ml-24 mt-1 h-[1.6rem] flex text-white  rounded-md"
                      onClick={Handlefollow}
                    >
                      <AddIcon className="ml-1 mt-[0.1rem]" /> follow
                    </span>
                  )}
                </>
              )}
              <div className="flex items-center gap-0 5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {isAuthor && (
                  <Menu>
                    <MenuHandler>
                      <MoreVertOutlinedIcon className="w-2 h-2 cursor-pointer hover:rounded-full hover:bg-blue-gray-50" />
                    </MenuHandler>
                    <MenuList>
                      <MenuItem
                        className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                        onClick={() => handledeleteClick(id)}
                      >
                        {" "}
                        <DeleteIcon className="h-4 w-4 text-red-500" />
                        <Typography
                          as="span"
                          variant="small"
                          className="font-normal"
                          color="red"
                        >
                          Delete Post
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </div>
            </div>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
              {tag_name}
            </p>
          </div>
        </div>
        <div className="p-0 mb-6">
          <p className="block font-sans ml-5 mr-5 text-base antialiased font-light leading-relaxed text-inherit">
            {desc}
          </p>
        </div>
        <img
          src={image}
          className="max-w-[30rem] object-fill w-[30rem] h-[16rem] max-h-[16rem] ml-16"
          alt="community img"
        />
      </div>
      <div class="flex items-center -mt-5 justify-between p-6">
        <div class="flex items-center -space-x-3">
          <img
            alt="natali craig"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
            class="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
          />
          <img
            alt="Tania Andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            class="relative inline-block h-9 w-9 !rounded-full  border-2 border-white object-cover object-center hover:z-10"
          />
        </div>
        <p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
          {timeAgo(time)}
        </p>
      </div>
      {showhidepage && <Bloghidepage user_id={userinfo.id} author_id={author_id} />}
    </div>
  );
}

export default CommunityCard;
