import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import Blogcard from "../../../components/Userside/blogcard/blogcard";

import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { GetBlogsByUser } from "../../../services/BlogsApi";

import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Tabs,
  TabsHeader,
  Tab,
  // Avatar,
  // IconButton,
  // Tooltip,
} from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { ImagePlacehoderSkeleton } from "../../../components/Skeletons/Blogcards";
function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  // const { userId } = useParams();
  const location = useLocation()
  const userId = location.state.userId
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedfilter,setSelectedfilter]=useState('')
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    document.title="InsighIT | MyBlogs";
    const Fetchmyblogs = async () => {
      try {
        const response = await GetBlogsByUser(userId, searchQuery, "",selectedfilter);
        setBlogs(response.data);
        console.log(response.data, "myblogssss");
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
  }, [userId, searchQuery,selectedfilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  const TABS = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Visible",
      value: "visible",
    },
    {
      label: "Hidden",
      value: "hidden",
    }];

  return (
    <div>
     
      <div className="flex">
      <div className='bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl'>
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
              <span>My Blogs</span>
            </div>
          </Breadcrumbs>
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[20rem] mt-10">My Blogs</h1>
            <div className="md:w-64 mt-12 ml-32">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Tabs value="all" className="w-full md:w-max ml-10 mt-10">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={()=>setSelectedfilter(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>

          <Blogfilter
            ListBlogs={GetBlogsByUser}
            userId={userId}
            setBlogs={setBlogs}
            searchQuery={searchQuery}
          />
          <div className='ml-[3rem]'>
          <div className="hidescroll h-[75rem] w-[55rem] overflow-x-hidden overflow-y-auto mb-5 ">
            {showSkeleton ? (
            <>
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
              <ImagePlacehoderSkeleton />
            </>
          ) :
            blogs.length > 0 ? (
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
              ))
            ) : (
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

export default MyBlogs;
