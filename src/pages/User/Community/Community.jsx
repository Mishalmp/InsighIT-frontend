import React, { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import EditIcon from "@mui/icons-material/Edit";
import {
  // Card,
  // CardHeader,
  Input,
  Typography,
  
  Button,
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

import CommunityCard from "../../../components/Community/Community";
import AddCommunity from "../../../components/Community/AddCommunity";
import { useSelector } from "react-redux";
import { ListCommunities } from "../../../services/BlogsApi";
import { toast } from "react-toastify";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CardPlacehoderSkeleton } from "../../../components/Skeletons/Community";
function Community() {
  const { userinfo } = useSelector((state) => state.user);

  const [communities, setCommunities] = useState([]);

  const [isaddformopen, setIsaddformopen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const handleToggleaddform = () => setIsaddformopen((prev) => !prev);
  const navigate = useNavigate()

  useEffect(() => {
    document.title="InsighIT | Community";
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        FetchCommunityposts();
      }, 1000);
    };

    fetchDataWithDelay();
  }, []);

  const FetchCommunityposts = async () => {
    try {
      const res = await ListCommunities();
      setCommunities(res.data);
    } catch (error) {
      console.error(error);
      toast.error("failed to fetch community posts");
    }
  };

  return (
    <div>
   
      <div className="flex">
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
              <span>Communtiy</span>
            </div>
          </Breadcrumbs>
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[20rem] mt-10">
              Community Posts
            </h1>
            <Button
              variant="gradient"
              className="w-28 h-10 mt-32 mb-10"
              onClick={handleToggleaddform}
            >
              <EditIcon fontSize="inherit" /> Create
            </Button>
            {/* <div className="md:w-72 mt-12 ml-36">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div> */}
          </div>

          <div className="ml-[3rem]">
            {/* <Sortorder/> */}

            <div className="h-[76rem] hidescroll w-[50rem]  overflow-x-hidden overflow-y-auto mb-5">
              {showSkeleton ? (
                 <>
                 <CardPlacehoderSkeleton/>
                 <CardPlacehoderSkeleton/>
                 <CardPlacehoderSkeleton/>
                 </>
              ):
              
              
              communities.length > 0 ? (
                communities.map((post) => <CommunityCard
                key={post.id}
                id={post.id}
                author={post.user.first_name+" "+ post.user.last_name} 
                
                desc={post.text}
                author_id={post.user.id}
                time={post.created_at}
                image={post.image}
                tag_name={post.user.tag_name}
                FetchCommunityposts={FetchCommunityposts}
                author_info={post.user}
                
                />)
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
      <AddCommunity
        userinfo={userinfo}
        isOpen={isaddformopen}
        onClose={handleToggleaddform}
        FetchCommunityposts={FetchCommunityposts}
      />
 
    </div>
  );
}

export default Community;
