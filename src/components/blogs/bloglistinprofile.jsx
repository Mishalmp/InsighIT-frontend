import React, { useEffect, useState } from "react";
import { GetBlogsByUser } from "../../services/BlogsApi";
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
} from "@material-tailwind/react";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Blogcard from "../Userside/blogcard/blogcard";
import { useSelector } from "react-redux/es/hooks/useSelector";
function Bloglistinprofile({ userid }) {
  const { userinfo } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const Fetchblogs = async () => {
      try {
        const response = await GetBlogsByUser(userid, searchQuery,"",'');
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    Fetchblogs();
  }, [userid, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  return (
    <>
      <div className="ml-72 flex">
        {userid === userinfo.id ? (
          <h1 className="font-bold text-2xl ">My Blogs</h1>
        ) : (
          <h1 className="font-bold text-2xl ">Author Blogs</h1>
        )}
        <div className="md:w-56 ml-28">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Card className="w-[50rem] min-h-[25rem] hidescroll max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-100">
        {blogs.length > 0?
        blogs.map((blog) => (
          <Blogcard
            key={blog.id}
            id={blog.id}
            profile_img={blog.user_id.profile_img}
            author={blog.user_id.first_name}
            date={blog.created_at}
            title={blog.title}
            content={blog.content}
            blog_image={blog.banner_img}
            topic={blog.topic.topic}
            likes={blog.likes}
            is_premium_blog={blog.is_premium_blog}
          />
        )):(
          <Typography variant='h3' className='text-center'>No Data Found</Typography>
        )
      }
      </Card>
    </>
  );
}

export default Bloglistinprofile;
