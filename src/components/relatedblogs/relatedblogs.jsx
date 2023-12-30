import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Myslider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetBlogsByUser } from "../../services/BlogsApi";
import { useNavigate,Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { timeAgo } from "../../helpers/Timemanage";

function Relatedblogs({ user }) {
  const [relatedblogs, setrelatedblogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const Fetchblogs = async () => {
      try {
        const response = await GetBlogsByUser(user.id, "", "", "");
        setrelatedblogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    Fetchblogs();
  }, [user.id]);

  return (
    <div className="mb-20 ml-10 ">
      <Typography variant="h4" className="text-center mt-16">
        Related Blogs
      </Typography>
      <div
       
        className="ml-5 mt-10 h-[25rem] grid grid-cols-4 gap-5 w-[88rem] mb-10"
      >
        {relatedblogs.slice(0,4).map((relatedblog) => (
          <Card className="w-[21rem] mb-10 h-[27rem] ml-2" key={relatedblog.id}>
            
              <img
                src={relatedblog.banner_img}
                className="object-cover w-[25rem] h-[12rem]"
                alt="card-image"
              />
                   <div className="flex mt-5">
              <img
            alt="candice"
            src={`${
                relatedblog.user_id.profile_img
                ? relatedblog.user_id.profile_img
                : "https://docs.material-tailwind.com/img/face-1.jpg"
            }`}
            className=" h-9 w-9 !rounded-full  object-cover object-center ml-5"
          />
           <Typography variant="h7" color="blue-gray" className="mb-2 mt-2 ml-2">
              {relatedblog.user_id.first_name + " " + relatedblog.user_id.last_name}{" "}
              <VerifiedIcon
                fontSize="small"
                className="-mt-1 ml-1"
                color="primary"
              /> </Typography>
                </div>
           
                <div className="ml-5 mb-5">
              <Typography variant="h6" color="blue-gray" className="mb-2 ml-2">
                {relatedblog.title}
              </Typography>
         
              <Typography className="ml-2 mr-2 text-sm h-20">
                {(() => {
                  var tempDiv = document.createElement("div");
                  tempDiv.innerHTML = relatedblog.content;
                  var plainTextContent =
                    tempDiv.textContent || tempDiv.innerText;
                  return plainTextContent.substring(0, 100);
                })()}
                ...
              </Typography>
              
          
              <Link to={`/User/detailblog/${relatedblog.id}/`} >
                <Button className="mt-3" >Read More</Button>
              </Link>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Relatedblogs;
