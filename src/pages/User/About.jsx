import React, { useEffect } from "react";
import {
  Carousel,
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  Breadcrumbs,
} from "@material-tailwind/react";
import banner_img1 from "../../assets/bannergif2.gif";
import { useNavigate } from "react-router-dom";
import banner_video from "../../assets/homepagebanner.mp4";
function About() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "InsighIT | About";
  }, []);
  return (
    <div>
      <Carousel
        className="rounded"
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
        <div className="relative h-[35rem] m-auto grid md:grid-cols-2">
          <video
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
            style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
          >
            <source src={banner_video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex-col md:ml-[10rem] space-y-4 md:space-y-10 mt-10 md:mt-[150px]">
            <h1 className="text-4xl text-white md:text-7xl font-serif font-bold text-center md:text-left">
              Stay{" "}
              <span className="text-4xl text-[#039368] md:text-7xl font-bold">
                Curious.
              </span>
            </h1>
            <p className="font-serif text-lg text-center text-white md:text-left max-w-[30rem] md:w-[100%]">
              Discover stories, thinking, and expertise from writers on any Tech
              Related topic.Can unlock long-term value and drive economic growth
            </p>
            <button className="px-6 py-3 rounded-[25px] bg-[#039368] text-white block mx-auto md:mx-0">
              Start Reading
            </button>
          </div>
        </div>
        <div
          className="h-[35rem] m-auto grid md:grid-cols-2"
          style={{ backgroundImage: `url(${banner_img1})` }}
        >
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
              we focus on markets where technology, innovation, and capital can
              unlock long-term value and drive economic growth.
            </p>
            <button className="px-6 py-3 rounded-[25px] bg-[#039368] text-white block mx-auto md:mx-0">
              Start Reading
            </button>
          </div>
        </div>
      </Carousel>
      <Breadcrumbs className="ml-32 w-36 mt-10">
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
          <span>About</span>
        </div>
      </Breadcrumbs>
      <h1 className="font-bold text-5xl text-center mt-5">About Us</h1>
      <Card className="w-full max-w-[60rem] h-[25rem] mt-20 ml-[14em] flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </Typography>
          <a className="inline-block mt-10">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>

      <Card className="w-full max-w-[60rem] h-[25rem] mt-20 ml-[14em] flex-row">
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            startups
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Lyft launching cross-platform service this week
          </Typography>
          <Typography color="gray" className="mb-8 font-normal">
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </Typography>
          <a className="inline-block mt-10">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Card>

      <div className="w-[60rem] ml-56 mt-10 h-[15rem] bg-white border border-gray-200 rounded-lg shadow ">
        <div
          className="p-4 bg-white rounded-lg md:p-8 grid grid-cols-3"
          id="stats"
          role="tabpanel"
          aria-labelledby="stats-tab"
        >
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
            <dd className="text-gray-500 dark:text-gray-400">Developers</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
            <dd className="text-gray-500 dark:text-gray-400">
              Public repositories
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
            <dd className="text-gray-500 dark:text-gray-400">
              Open source projects
            </dd>
          </div>
          <div className="flex mt-8 flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
            <dd className="text-gray-500 dark:text-gray-400">Contributors</dd>
          </div>
          <div className="flex mt-8 flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">90+</dt>
            <dd className="text-gray-500 dark:text-gray-400">
              Top Forbes companies
            </dd>
          </div>
          <div className="flex mt-8 flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
            <dd className="text-gray-500 dark:text-gray-400">Organizations</dd>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10 ml-28">
        <a
          href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </a>

        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>

        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
          </svg>
          <a href="#">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Need a help in Claim?
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Go to this step by step guideline process on how to certify for your
            weekly benefits:
          </p>
          <a
            href="#"
            class="inline-flex items-center text-blue-600 hover:underline"
          >
            See our guideline
            <svg
              class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
