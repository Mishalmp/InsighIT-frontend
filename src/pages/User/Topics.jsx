import { Breadcrumbs, Chip, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Sortorder from "../../components/Userside/sortbar/sortorder";
import { useNavigate } from 'react-router-dom';
import { ListTopics } from "../../services/AdminApi";
import { DefaultSkeleton } from '../../components/Skeletons/Usercard';
function Topics() {
    const navigate = useNavigate()
    const [sort, setSort] = useState("latest");
    const [searchQuery, setSearchQuery] = useState("");
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [topics, settopics] = useState([]);

    useEffect(() => {
        const fetchDataWithDelay = async () => {
            // Show skeleton for 1 second
            setShowSkeleton(true);
            setTimeout(() => {
              setShowSkeleton(false);
              fetchTopics();
            }, 1000);
          };
          fetchDataWithDelay()
      }, [searchQuery,sort]);
    
      const fetchTopics = async () => {
        try {
          const ress = await ListTopics(searchQuery,'active',sort);
          settopics(ress.data);
        } catch (error) {
          console.error(error);
        }
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
            <span >Topics</span>
          </div>
        </Breadcrumbs>

        <div className="flex">
          <h1 className="font-bold text-5xl ml-[20rem] mt-10">Topics</h1>
          <div className="md:w-72 mt-12 ml-[8rem] ">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
            />
          </div>
        </div>
    
        <div className="ml-[3rem] mt-10">
          <Sortorder setSort={setSort} sort={sort} />

          <div className="h-[75rem] w-[55rem] grid grid-cols-2 hidescroll overflow-y-auto">
          {showSkeleton?(
            <>
            <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
            </>
        ):
        
        topics.length > 0 ? (
          topics.map((topic) => (
            <div className="max-w-sm h-[14rem] mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow ">
              <div className="grid grid-cols-4">
                <div>
                  <img
                    className="w-16 h-16 rounded-full object-contain"
                    src={topic.img}
                    alt={topic.topic}
                  />
                </div>
                <div className="flex col-span-3 justify-between gap-2">
                  <h5 className="mb-2 ml-4 mt-2 text-center text-2xl font-semibold tracking-tight text-gray-900 ">
                    {topic.topic}
                  </h5>
                </div>
              </div>
              <p className="mb-3 font-normal text-gray-500 ">{topic.desc}</p>
              <div className="grid grid-cols-2 mt-10">
                <a className="inline-flex items-center text-blue-800">
                  Blogs Created :{topic.num_blogs}
                </a>
                {/* <div className="ml-10">
                  <h6 className="mb-2 text-xl font-semibold text-center tracking-tight text-gray-900 ">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={topic.is_block ? "Inactive" : "Active"}
                      color={topic.is_block ? "red" : "green"}
                    />
                  </h6>
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h3" className="text-center">
            No Topics Found
          </Typography>
        )}
          </div>
        </div>
      </div>

      <Sidebar />
    </div>
  </div>
  )
}

export default Topics
