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
    <div className="bg-white">
    <div className="flex flex-col lg:flex-row">
      <div className="bg-gray-50 mt-5 rounded-lg md:max-w-4xl md:ml-24 md:mr-10 mb-5 shadow-2xl">
        {/* Breadcrumbs */}
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
            <div className="opacity-60 ">
              <span >Blogs</span>
            </div>
        </Breadcrumbs>

        {/* Search bar and blog filter */}
        <div className="flex flex-col md:flex-row items-center justify-around ml-20 mt-10">
          <h1 className="font-bold text-5xl md:ml-28">Blogs</h1>
          <div className="md:w-72 mt-4 md:mt-0 md:ml-8">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Blog filter */}
        <Blogfilter
          ListBlogs={ListBlogs}
          setBlogs={setBlogs}
          searchQuery={searchQuery}
          sort={sort}
        />

        {/* Sort order */}
        <Sortorder setSort={setSort} sort={sort} />

        {/* Blog cards */}
        <div className="ml-5 mr-5">
          <div className="overflow-x-hidden h-[60rem] overflow-y-auto mb-5 hidescroll">
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

      {/* Sidebar */}
      <Sidebar />
    </div>
  </div>
  );
}

export default Blogs;
