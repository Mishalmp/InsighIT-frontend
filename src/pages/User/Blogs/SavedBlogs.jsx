import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Blogcard from "../../../components/Userside/blogcard/blogcard";

import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { ListSaved } from "../../../services/BlogsApi";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { Loader } from "../../../components/Loading/Loader";
import Sidebar from "../../../components/sidebar/Sidebar";
import { ImagePlacehoderSkeleton } from "../../../components/Skeletons/Blogcards";

function SavedBlogs() {
  const [saved, setSaved] = useState(null);
  const { userinfo } = useSelector((state) => state.user);
  const location = useLocation()
  const userId = location.state.userId
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    document.title="InsighIT | Saved";
    const Fetchmyblogs = async () => {
      try {
        const response = await ListSaved(userId, searchQuery);
        setSaved(response.data);
        // console.log(response.data, "myblogssss");
      } catch (error) {
        console.error("error! fetching my blogs", error);
      }
    };
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        Fetchmyblogs();
      }, 1000);
    };

    fetchDataWithDelay();
  }, [userId, searchQuery]);




  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log(saved, "my saved");
  return (
    <div>
     
      <div className="flex">
      <div className='bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl'>
      <Breadcrumbs className="ml-20 w-40 mt-10">
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
              <span>Saved Blogs</span>
            </div>
          </Breadcrumbs>
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[25rem] mt-10">
              Saved Blogs
            </h1>
            {/* <div className="md:w-72 -mt-9 ml-28">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div> */}
          </div>
          <Blogfilter />
          <div className='ml-[3rem]'>
          <div className="h-[60rem] w-[55rem] hidescroll overflow-x-hidden overflow-y-auto mb-5">
            {showSkeleton ? (
            <>
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
            </>
          ) :saved && saved.length > 0 ? (

          
            saved.map((savedBlog) => (
              <Blogcard
                key={savedBlog.id}
                id={savedBlog.blog.id}
                profile_img={savedBlog.blog.user_id.profile_img}
                author={savedBlog.blog.user_id.first_name}
                date={savedBlog.created_at}
                title={savedBlog.blog.title}
                content={savedBlog.blog.content}
                blog_image={savedBlog.blog.banner_img}
                topic={savedBlog.blog.topic.topic}
                likes={savedBlog.blog.likes}
                is_premium_blog={savedBlog.blog.is_premium_blog}
                is_saved={true}
              />
            ))):(
              <Typography variant="h3" className="text-center">
              No Data Found
            </Typography>
            )}
          </div>
        </div>

        
      </div>
      <Sidebar/>
    </div>
  
    </div>
  );
}

export default SavedBlogs;
