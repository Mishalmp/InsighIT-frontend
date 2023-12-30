import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Carousel,
} from "@material-tailwind/react";
import Myslider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../pages/Home.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { CardPlacehoderSkeleton } from "../Skeletons/News";
function Technews() {
  const [newss, setNews] = useState([]);

  const fetchdata = async () => {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=779335093dc943fc916cff1ac2af4308"
    );

    let data = await response.json();

    setNews(data.articles);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // console.log(newss, "newss");

  return (
    <div>
      <div className="flex gap-4 mt-32 ">
        <WhatshotIcon fontSize="large" />
        <Typography variant="h4" className="">
          Tech News Daily
        </Typography>
      </div>

      {newss.length > 0 ? (
        <div className="flex flex-wrap overflow-y-auto mt-10 justify-start gap-4">
          {newss.slice(0, 8).map((news, index) => (
            <Card key={index} className="w-[20rem]  mb-10 h-[28rem]">
              {news.urlToImage ? (
                <img
                  src={news.urlToImage}
                  className="object-cover h-[12rem]"
                  alt="card-image"
                />
              ) : (
                <div className="object-cover h-[12rem] bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
              )}
              <CardBody className="h-[11rem]">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {news.author}
                </Typography>
                <Typography>{news.title.substring(0, 100) + "..."}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <a href={news.url}>
                  <Button>Read More</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <CardPlacehoderSkeleton />
      )}
    </div>
  );
}

export default Technews;
