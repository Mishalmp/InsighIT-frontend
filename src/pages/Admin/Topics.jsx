import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Chip,
  Tabs,
  Tab,
  TabsHeader,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateTopics, UpdateTopic } from "../../services/BlogsApi";
import Topiccreate from "../../components/Topics/Topiccreate";
import Topicedit from "../../components/Topics/Topicedit";
import { ListTopics } from "../../services/AdminApi";
import { DefaultSkeleton } from "../../components/Skeletons/Usercard";
import Sortorder from "../../components/Userside/sortbar/sortorder";
function Topics() {
  const [topics, settopics] = useState([]);
  const [sort, setSort] = useState("latest");
  const [selectedtopic, setselectedtopic] = useState({
    topic: "",
    desc: "",
    img: null,
  });
  const [modalopen, setmodalopen] = useState(false);
  const [modalopenedit, setmodalopenedit] = useState(false);
  const [searchQuery,setSearchQuery] = useState("")
  const [filter,setfilter] = useState("")
  const [showSkeleton, setShowSkeleton] = useState(true);

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
  }, [searchQuery,filter,sort]);

  const fetchTopics = async () => {
    try {
      const ress = await ListTopics(searchQuery,filter,sort);
      settopics(ress.data);
    } catch (error) {
      console.error(error);
    }
  };
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    }];
  return (
    <>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Topics
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about Tech Topics in InsighIT
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <Typography
            className="text-center ml-[40%]"
            variant="h2"
            color="blue-gray"
          >
            Topics
          </Typography>

          <Button
            variant="gradient"
            className="w-28 h-10  float-right mr-20"
            onClick={() => setmodalopen(true)}
          >
            <EditIcon fontSize="inherit" /> Create
          </Button>
        </div>
        
        <Tabs value="all" className="w-full md:w-max mt-10">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={()=>setfilter(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="-mt-10">
            <Sortorder setSort={setSort} sort={sort} />
            </div>
      </CardHeader>
      <div className="ml-24 mt-10 mb-5 h-[38rem] grid grid-cols-2 hidescroll overflow-y-auto">
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
                  <EditIcon
                    onClick={() => {
                      setselectedtopic(topic);
                      setmodalopenedit(true);
                    }}
                  />
                </div>
              </div>
              <p className="mb-3 font-normal text-gray-500 ">{topic.desc}</p>
              <div className="grid grid-cols-2 mt-10">
                <a className="inline-flex items-center text-blue-800">
                  Blogs Created :{topic.num_blogs}
                </a>
                <div className="ml-10">
                  <h6 className="mb-2 text-xl font-semibold text-center tracking-tight text-gray-900 ">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={topic.is_block ? "Inactive" : "Active"}
                      color={topic.is_block ? "red" : "green"}
                    />
                  </h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h3" className="text-center">
            No Topics Found
          </Typography>
        )}
        <Topicedit
          isOpen={modalopenedit}
          onClose={() => setmodalopenedit(false)}
          fetchTopics={fetchTopics}
          onSubmit={UpdateTopic}
          topics={topics}
          topic={selectedtopic}
          settopic={setselectedtopic}
          prevtopic={selectedtopic.topic}
        />
        <Topiccreate
          isOpen={modalopen}
          onClose={() => setmodalopen(false)}
          fetchTopics={fetchTopics}
          onSubmit={CreateTopics}
          topics={topics}
        />
      </div>
    </>
  );
}

export default Topics;
