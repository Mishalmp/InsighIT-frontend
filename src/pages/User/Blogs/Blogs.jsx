import React, { useEffect, useState } from "react";

import Blogcard from "../../../components/Userside/blogcard/blogcard";

import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { ListBlogs } from "../../../services/BlogsApi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Breadcrumbs } from "@material-tailwind/react";
import {
  // Card,
  // CardHeader,
  Input,
  Typography,
  // Typography,
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
import { ImagePlacehoderSkeleton } from "../../../components/Skeletons/Blogcards";
import Sortorder from "../../../components/Userside/sortbar/sortorder";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title="InsighIT | Blogs";
    const FetchBlogs = async () => {
      try {
        const response = await ListBlogs(searchQuery, "", sort);
        setBlogs(response.data);
      } catch (error) {
        console.error("error! fetching blogs", error);
      }
    };
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        FetchBlogs();
      }, 1000);
    };

    fetchDataWithDelay();
  }, [searchQuery, sort]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  return (
    <div className="bg-white ">
      <div className="flex">
        {/* <div className={`flex-grow ${isSidebarFixed ? 'ml-[28rem]' : ''}`}> */}
        <div className="bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl">
          <Breadcrumbs className="ml-20 w-36 mt-10">
            <div onClick={() => navigate("/User/Home/")} className="opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div className="opacity-60">
              <span >Blogs</span>
            </div>
          </Breadcrumbs>

          <div className="flex">
            <h1 className="font-bold text-5xl ml-[20rem] mt-10">Blogs</h1>
            <div className="md:w-72 mt-12 ml-[8rem] ">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Blogfilter
            ListBlogs={ListBlogs}
            setBlogs={setBlogs}
            searchQuery={searchQuery}
            sort={sort}
          />
          <div className="ml-[3rem]">
            <Sortorder setSort={setSort} sort={sort} />

            <div className="h-[75rem] w-[55rem] overflow-x-hidden overflow-y-auto mb-5 hidescroll">
            {showSkeleton ? (
            <>
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
            </>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Blogcard
                key={blog.id}
                id={blog.id}
                profile_img={blog.user_id.profile_img}
                user_premium={blog.user_id.is_premium}
                author={
                  blog.user_id.first_name + " " + blog.user_id.last_name
                }
                date={blog.created_at}
                title={blog.title}
                content={blog.content}
                blog_image={blog.banner_img}
                topic={blog.topic.topic}
                likes={blog.likes}
                is_premium_blog={blog.is_premium_blog}
              />
            ))
          ) : (
            <Typography variant="h3" className="text-center">
              No Data Found
            </Typography>
          )}
            </div>
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}

export default Blogs;
