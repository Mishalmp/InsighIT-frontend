import React, { useEffect, useRef, useState } from "react";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GetTopics } from "../../../services/BlogsApi";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function Blogfilter({ ListBlogs, setBlogs, searchQuery, userId,sort }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const FetchTopics = async () => {
      try {
        const response = await GetTopics();
        setTopics(response.data);
      } catch (error) {
        console.error("Error!fetching topics..", error);
      }
    };
    FetchTopics();
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const sliderRef = useRef(null);

  const handleTabClick = async (topic) => {
    setActiveTab(topic === "" ? "all" : topic);

    try {
      let apiCall;

      if (userId) {
        apiCall = await ListBlogs(userId, searchQuery, topic,'');
      } else {
        apiCall = await ListBlogs(searchQuery, topic,sort);
      }

      setBlogs(apiCall.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="w-[56rem] flex-row items-center ml-[3rem] mt-10 mb-10">
      <ChevronLeftOutlinedIcon
        fontSize="large"
        className="float-left mt-3"
        onClick={() => sliderRef.current.slickPrev()}
      />
      <Tabs value={activeTab} className="w-[52rem]">
        <Slider
          ref={sliderRef}
          {...settings}
          className="rounded-none border-b cursor-pointer flex-row justify-evenly gap-7 border-blue-gray-50 bg-transparent p-4"
          indicatorProps={{
            className:
              "bg-transparent cursor-pointer border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          <div
            key="all"
            // value="all"
          onClick={() => handleTabClick("")}

            className={`text-gray-900 cursor-pointer text-center hover:bg-gray-200 rounded-2xl ${
              activeTab === "all" ? "w-auto font-bold" : ""
            }`}
          >
            All
          </div>

          {topics.map(({ id, topic }) => (
            <div
              key={id}
              value={topic}
              onClick={() => handleTabClick(topic)}
              className={`text-gray-900 cursor-pointer text-center hover:bg-gray-200 rounded-2xl ${
                activeTab === topic ? "w-auto font-bold" : ""
              }`}
            >
              {topic}
            </div>
          ))}
        </Slider>
      </Tabs>
      <ChevronRightOutlinedIcon
        fontSize="large"
        className="float-right ml-2 -mt-[2.8rem]"
        onClick={() => sliderRef.current.slickNext()}
      />
    </div>
  );
}

export default Blogfilter;
