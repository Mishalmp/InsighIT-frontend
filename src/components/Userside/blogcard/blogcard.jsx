import React from "react";
import user from "../../../assets/blogs/usericontemp.png";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link, useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";

function timeAgo(date) {
  const now = new Date();
  const timestamp = new Date(date);
  const elapsedMilliseconds = now - timestamp;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} seconds ago`;
  }

  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minutes ago`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);

  if (elapsedHours < 24) {
    return `${elapsedHours} hours ago`;
  }

  const elapsedDays = Math.floor(elapsedHours / 24);
  return `${elapsedDays} days ago`;
}

function Blogcard({
  id,
  author,
  date,
  title,
  content,
  blog_image,
  topic,
  likes,
  profile_img,
  is_premium_blog,
  user_premium,
  is_saved,
}) {


  const createdAtAgo = timeAgo(date);
  // const blogDetailUrl = `/User/detailblog/${id}/`;
  
  const navigate = useNavigate()


  // console.log(user_premium, "premiummm");

  // Create a temporary div element
  const tempDiv = document.createElement("div");

  // Set the innerHTML of the div to your blog content
  tempDiv.innerHTML = content;

  // Use textContent to get the plain text without HTML tags
  const plainTextContent = tempDiv.textContent || tempDiv.innerText;

  return (
    <>
      {/* <Link to={}> */}
      <Card
      onClick={() => navigate(`/User/detailblog/`, { state: { id } })}
      className="rounded-lg bg-white shadow-2xl mb-5"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          {profile_img ? (
            <img src={profile_img} className="w-12 h-12 rounded-full mr-3" />
          ) : (
            <svg
              className="w-12 h-12 rounded-full mr-3 text-gray-300 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          )}
          <div className="flex">
            <div>
            <p className="font-semibold text-lg">
              {author}
              {user_premium && (
                <VerifiedIcon
                  color="primary"
                  fontSize="small"
                  className="-mt-1 ml-2"
                />
              )}
            </p>
            <p className="text-gray-700">{createdAtAgo}</p>
            </div>
            {is_premium_blog && (
              <div className="flex items-center ml-20">
                <StarRateIcon color="warning" className="" />
                <Typography color="deep-purple" className="ml-2 md:font-semibold text-sm">
                  Members Only
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 text-black font-bold md:-mt-20"
            >
              {title}
            </Typography>
            <Typography className="mb-4 md:max-w-md text-sm text-gray-600">
              {plainTextContent.substring(0, 250)}...
            </Typography>
          </div>
          <div className="md:w-[20rem] mb-5">
            <img
              src={blog_image}
              alt="card-image"
              className="w-full h-auto md:h-[15rem] object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center max-w-lg">
          <div className="bg-gray-200 h-[40px] rounded-[28px] w-[200px] flex items-center justify-center">
            <span className="text-xl">{topic}</span>
          </div>
          <ul className="flex md:space-x-4 space-x-2">
            <li className="flex items-center">
              <ThumbUpOffAltIcon />
              <span className="ml-2 text-gray-700">{likes}</span>
            </li>
            <li className="flex items-center">
              {is_saved ? (
                <BookmarkOutlinedIcon className="w-6 h-6 text-primary" />
              ) : (
                <BookmarkAddIcon className="w-6 h-6" />
              )}
            </li>
            <li className="flex items-center">
              <MoreHorizIcon />
            </li>
          </ul>
        </div>
      </div>
    </Card>
      {/* </Link> */}
    </>
  );
}

export default Blogcard;
