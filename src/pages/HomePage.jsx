import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import banner_img from "../assets/banner.jpg";
import banner_img1 from "../assets/bannergif2.gif";
import banner_video from '../assets/homepagebanner.mp4'
import Blogcard from "../components/Userside/blogcard/blogcard";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import { TrendingBlogs, TrendingTopics } from "../services/BlogsApi";
import Usercardlist from "../components/Userside/usercardlist/Usercardlist";
import Technews from "../components/Technews/Technews";
import "./Home.css";
import {
  Carousel,
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { ImagePlacehoderSkeleton } from "../components/Skeletons/Blogcards";
import { DefaultSkeleton } from "../components/Skeletons/Usercard";
export default function HomePage() {
  // const [toggle,setToggle]=useState(false)
  const [blogs, setBlogs] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    document.title = "InsighIT | Home";
    const FetchTrendingBlogs = async () => {
      try {
        const response = await TrendingBlogs();
        setBlogs(response.data);
      } catch (error) {
        console.error("Error! fetching trending blogs", error);
      }
    };

    const FetchTrendingTopics = async () => {
      try {
        const response = await TrendingTopics();
        setTopics(response.data);
      } catch (error) {
        console.error("Error! fetching trending blogs", error);
      }
    };
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        FetchTrendingBlogs();
        FetchTrendingTopics();
      }, 1000);
    };

    fetchDataWithDelay();
  }, []);

  return (
    <div>
      <div className="w-full bg-black">
        <Carousel
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
                <div
            className=" h-[35rem] m-auto grid md:grid-cols-2"
            style={{ backgroundImage: `url(${banner_img1})` }}
          >
            <div className="flex-col md:ml-[10rem] space-y-4 md:space-y-10 mt-10 md:mt-[150px]">
              <h1 className="text-4xl text-white md:text-7xl font-serif font-bold text-center md:text-left">
                Stay{" "}
                <span className="text-4xl text-[#039368] md:text-7xl font-bold">
                  Curious.
                </span>
              </h1>

              <p className="font-serif text-lg text-center text-white md:text-left max-w-[30rem] md:w-[100%]">
                Discover stories, thinking, and expertise from writers on any
                Tech Related topic.Get Insight about IT
              </p>
              <button className="px-6 py-3 rounded-[25px] bg-[#039368] text-white block mx-auto md:mx-0">
                Start Reading
              </button>
            </div>
          </div>
            <div className="relative h-[35rem] m-auto grid md:grid-cols-2">
            <video
              autoPlay
              loop
              muted
              className="object-cover w-full h-full"
              style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
            >
              <source
                src={banner_video}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            <div className="flex-col md:ml-[10rem] space-y-4 md:space-y-10 mt-10 md:mt-[150px]">
              <h1 className="text-2xl text-white md:text-6xl font-serif font-bold text-center md:text-left">
                We invest in the world's{" "}
                <span className="text-4xl text-[#039368] md:text-6xl font-bold">
                  {" "}
                  potential{" "}
                </span>
              </h1>
              <p className="font-serif text-lg text-center text-white md:text-left max-w-[40rem] md:w-[100%]">
                Here at{" "}
                <span className="font-semibold text-[#039368]"> InsighIT </span>{" "}
                we focus on markets where technology, innovation, and capital
                can unlock long-term value and drive economic growth.
              </p>
              <button className="px-6 py-3 rounded-[25px] bg-[#039368] text-white block mx-auto md:mx-0">
                Start Reading
              </button>
            </div>
          </div>
    

        </Carousel>
      </div>
      {/* <div className="w-full h-[1.5px] bg-[#039368]"></div> */}
      <div className="max-w-[1480px] m-10 md:ml-[7rem]">
        <div className="flex flex-col md:flex-row mt-4 md:mt-[5rem] gap-4">
          <WhatshotIcon fontSize="large" />
          <h2 className="text-2xl md:text-3xl  font-normal mt-2 md:mt-0">
            Trending Topics
          </h2>
        </div>
        <div className="flex mb-10 gap-10  mt-5">
          {showSkeleton ? (
            <>
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
            </>
          ) : topics.length > 0 ? (
            topics.map((topic) => (
              <div className="w-[18rem] h-[16rem] mt-5 p-6 bg-[#eff5fb] border shadow-lg  border-gray-200 rounded-lg ">
                <div className="grid grid-cols-2 h-20">
                  <div>
                    <img
                      className="w-16 h-16 rounded-full object-contain"
                      src={topic.img}
                      alt={topic.topic}
                    />
                  </div>
                  <div>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                      {topic.topic}
                    </h5>
                  </div>
                </div>
                <p className="mb-3 font-normal h-20 text-gray-500 ">
                  {topic.desc}
                </p>
                <div className="grid grid-cols-1 mt-5">
                  <a className="inline-flex items-center text-sm text-blue-800">
                    No of Blogs Created :{topic.num_blogs}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h3" className="text-center">
              No Topics Found
            </Typography>
          )}
        </div>

        <Technews />
        <Usercardlist />

        <div className="mt-4 md:mt-[100px]">
          <div className="flex gap-4 ml-2">
            <WhatshotIcon fontSize="large" />
            <h2 className="text-2xl md:text-3xl font-normal mt-2 md:mt-0">
              Trending Blogs
            </h2>
          </div>

          <div className="mt-10 ">
            {showSkeleton ? (
              <>
                <ImagePlacehoderSkeleton />
                <ImagePlacehoderSkeleton />
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
                  author={blog.user_id.first_name}
                  date={blog.created_at}
                  title={blog.title}
                  content={blog.content}
                  blog_image={blog.banner_img}
                  topic={blog.topic.topic}
                  likes={blog.likes}
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
    </div>
  );
}
