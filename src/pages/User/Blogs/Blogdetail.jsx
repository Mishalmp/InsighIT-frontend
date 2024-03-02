import React, { useEffect, useRef, useState } from "react";
import {
  GetBlogDetail,
  DeleteBlog,
  LikeBlog,
  UnlikeBlog,
  GetBlogLike,
  CreateSaved,
  IsSave,
  Unsave,
  UpdateBlog,
} from "../../../services/BlogsApi";
import { useSelector } from "react-redux";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loading/Loader";

import Commentlist from "../../../components/Comment/commentlist";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import CommentIcon from "@mui/icons-material/Comment";
import { Breadcrumbs } from "@material-tailwind/react";
import Commentpost from "../../../components/Comment/commentpost";
import NotificationModal from "../../../components/Modal/NotificationModal";
import { Rating } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Bloghidepage from "../../../components/premiumuser/premiumBlog/Bloghidepage";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Relatedblogs from "../../../components/relatedblogs/relatedblogs";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

import ReportIcon from "@mui/icons-material/Report";
import Report from "../../../components/Report/Report";
import DeleteModal from "../../../components/Modal/Blog/DeleteModal";
import {
  IsSubscriber,
  CreateFollowing,
  Is_follower,
  Unfollow,
} from "../../../services/UserApi";
import AddIcon from "@mui/icons-material/Add";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { timeAgo } from "../../../helpers/Timemanage";
import { NotificationCreate } from "../../../services/UserApi";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsurl } from "../../../constants/constants";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { sendNotification } from "../../../helpers/Notificationuser";

function Blogdetail() {
  // const { blogId } = useParams();
  const location = useLocation()
  const blogId = location.state.id
  const [blog, setBlog] = useState(null);
  const { userinfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [is_following, setIs_following] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSaved, SetisSaved] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [is_subscriber,setis_subscriber] = useState(true)

  const [ishidemodal, setishidemodal] = useState(false);

  const commentListRef = useRef(null);

  const handleOpenReportDialog = () => {
    setIsReportDialogOpen(true);
  };

  // Function to close the Report dialog
  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenHideModal = () => {
    setishidemodal(true);
  };

  const handleCloseHideModal = () => {
    setishidemodal(false);
  };

  const handleHideBlog = async () => {
    try {
      const updatedBlog = { is_hide: !blog.is_hide };

      await UpdateBlog(blog.id, updatedBlog);


      setishidemodal(false)
      FetchBlog();
    } catch (error) {
    
      console.error("An error occurred while updating blog status:", error);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.title="InsighIT | BlogView";
    FetchBlog();
  }, [blogId, userinfo.id, is_following]);

  const FetchBlog = async () => {
    try {
      const response = await GetBlogDetail(blogId);
      console.log(response.data, "response data");
      setBlog(response.data);

      const res_ponse = await IsSubscriber(
        userinfo.id,
        response.data.user_id.id
      );

      console.log(res_ponse, "response is content visible");
      setis_subscriber(res_ponse.data.is_subscriber)

      if (
        userinfo.id !== response.data.user_id.id &&
        response.data.is_premium_blog
      ) {
    
        if (!res_ponse.data.is_subscriber) {
          setIsContentVisible(false);
        }
      }

      const like_res = await GetBlogLike(blogId, userinfo.id);

      setIsLiked(like_res.data.liked);
      console.log(like_res, "like-resssdata");

      const res_follow = await Is_follower(
        userinfo.id,
        response.data.user_id.id
      );
      setIs_following(res_follow.data.is_follower);

      const res_save = await IsSave(userinfo.id, blogId);
      SetisSaved(res_save.data.saved);
    } catch (error) {
      console.error("error! fetching blog", error);
    }
  };



  const handlelike = async () => {
    const values = {
      blog: blogId,
      user: userinfo.id,
    };

    const notificationMessage = `${userinfo.first_name} Liked your Blog ${blog.title}`;
    const receiverId = blog.user_id.id;

    const noti_values = {
      user: receiverId,
      text: notificationMessage,
    };

    try {
      const response = await LikeBlog(values);
      console.log(response);
      const liked = response.data.liked;
      setIsLiked(liked);

      sendNotification(notificationMessage, receiverId);

      await NotificationCreate(noti_values);
      toast.success("Liked Blog");

      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: prevBlog.likes + 1,
      }));


    } catch (error) {
      console.error(error);
    }
  };

  const handleunlike = async () => {
    const values = {
      blog: blogId,
      user: userinfo.id,
    };

    const notificationMessage =  `${userinfo.first_name} UnLiked for your Blog ${blog.title}`
    const receiverId = blog.user_id.id;

    const noti_values = {
      user: blog.user_id.id,
      text:notificationMessage,
    };
    try {
      const response = await UnlikeBlog(values);
      console.log(response);
      const liked = response.data.liked;
      setIsLiked(liked);

      sendNotification(notificationMessage,receiverId)

      await NotificationCreate(noti_values);
      toast.success("UnLiked Blog");
      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: prevBlog.likes - 1,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (!blog) {
    return <Loader />;
  }

  const createdAtAgo = timeAgo(blog.created_at);
  const isAuthor = userinfo.id == blog.user_id.id;

  const handleEdit = () => {
    navigate(`/User/editblog/`,{state:{blogId}});
  };

  const handleDelete = async () => {
    try {
      const response = await DeleteBlog(blogId);
      toast.success("Blog deleted Successfully");
      navigate(`/User/myblogs/`,{state:{userId:userinfo.id}});

    } catch (error) {
      toast.error("Error Occured while deleting");
      console.error("Error deleting blog:", error);
    }
  };

  const handlecommenticon = () => {
    if (commentListRef.current) {
      commentListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleauthornavigate = () => {
    if (isAuthor) {
      navigate("/User/userprofile");
    } else {
      navigate("/User/authorprofile/",{state:{authorId:blog.user_id.id}});
    }
  };

  const Handlefollow = async () => {
    const values = {
      follower: userinfo.id,
      following: blog.user_id.id,
    };

    const notificationMessage = `${userinfo.first_name} started Follow You`

    const noti_values = {
      user: blog.user_id.id,
      text: notificationMessage,
    };

    try {
      console.log(blog.user_id.is_premium ,is_subscriber,"hiideeeeeeeeee");
      if(blog.user_id.is_premium && !is_subscriber){
        setIsContentVisible(false);
      }else{
        const resp = await CreateFollowing(values);
        toast.success("followed successfully");
  
        sendNotification(notificationMessage,blog.user_id.id)
  
        await NotificationCreate(noti_values);
        setIs_following(true);

      }

 
    } catch (error) {
      console.error(error);
    }
  };

  const Handleunfollow = async () => {
    try {
      const notificationMessage = `${userinfo.first_name}  UnFollowed You`
      const noti_values = {
        user: blog.user_id.id,
        text: notificationMessage,
      };
      const ress = await Unfollow(userinfo.id, blog.user_id.id);
      toast.success("unfollowed successfully");

      sendNotification(notificationMessage,blog.user_id.id)

      await NotificationCreate(noti_values);
      setIs_following(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        const tempDiv = document.createElement("div");

        // Set the innerHTML of the div to your blog content
        tempDiv.innerHTML = blog.content;

        // Use textContent to get the plain text without HTML tags
        const plainTextContent = tempDiv.textContent || tempDiv.innerText;

        await navigator.share({
          title: blog.title,
          text: plainTextContent.substring(0, 100),
          url: window.location.href,
        });
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const HandleSave = async () => {
    try {
      if (isSaved) {
        await Unsave(userinfo.id, blogId);
        toast.success("Unsaved blog");
      } else {
        await CreateSaved({ user: userinfo.id, blog: blogId });
        toast.success("saved Blog");
      }

      SetisSaved(!isSaved);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">  
      <div className="flex max-w-6xl">
      <Breadcrumbs className="lg:ml-20 xl:ml-48 md:w-52 w-32 mt-10">
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
            <div onClick={()=>navigate("/User/blogs/")} className="opacity-60">
              <span className="md:text-sm text-xs">Blogs</span>
            </div>
            <div className="opacity-60">
              <span className="md:text-sm text-xs">Blog Detail</span>
            </div>
          </Breadcrumbs>
        <Typography className="font-bold md:text-5xl text-3xl ml-[20%] mt-10">
          Blog Detail
        </Typography>
      </div>

      {isContentVisible ? (
        <>
          <Card className="md:max-w-5xl w-full mt-10 lg:m-20 xl:ml-56  bg-gray-100">
            <Typography className="text-3xl mt-5 font-semibold text-center mb-6">
              {blog.title}
            </Typography>

            <div className="flex md:m-[50px] m-5 gap-10">
              {blog.user_id.profile_img?(
                   <img
                   src={blog.user_id.profile_img}
                   className="md:w-14 w-10 md:h-14 h-10 rounded-full cursor-pointer"
                   onClick={handleauthornavigate}
                 />
              ):(
                <svg
                className="md:w-14 w-10 md:h-14 h-10 rounded-full cursor-pointer text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                onClick={handleauthornavigate}
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              )

              }
           

              <div className="mt-3 flex gap-10">
                <p
                  className="font-semibold text-sm md:text-xl cursor-pointer"
                  onClick={handleauthornavigate}
                >
                  {blog.user_id.first_name} {blog.user_id.last_name}
                </p>

                {!isAuthor && (
                  <>
                    {is_following ? (
                      <span
                        onClick={Handleunfollow}
                        className="bg-green-100 w-16 text-xs md:w-24 md:text-md font-semibold cursor-pointer justify-center items-center h-[1.6rem] flex text-blue-800  rounded-md"
                      >
                        following
                      </span>
                    ) : (
                      <span
                        className="bg-blue-800 w-20 text-md gap-1 cursor-pointer mt-1 h-[1.6rem] flex text-white  rounded-md"
                        onClick={Handlefollow}
                      >
                        <AddIcon className="ml-1 mt-[0.1rem]" /> follow
                      </span>
                    )}
                  </>
                )}

                <p className="text-gray-700 text-sm">{createdAtAgo}</p>

                {/* <Rating value={4} className="-mt-5" /> */}
              </div>
            </div>
            <hr />
            <div className="md:mt-1 md:mb-1 md:ml-10 ml-2 max-w-4xl h-12 flex justify-between items-center">
              <div className="bg-gray-300 md:h-[2rem] rounded-[28px] md:w-64 sm:w-20  flex items-center justify-center">
                <span className="md:text-xl sm:text-sm text-xs">{blog.topic.topic}</span>
              </div>

              <ul className="flex space-x-8">
                <li
                  className="flex items-center"
                  onClick={isLiked ? handleunlike : handlelike}
                >
                  <ThumbUpOffAltIcon
                    color={isLiked ? "primary" : ""}
                    className="md:w-14 w-8 md:h-14 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700">{blog.likes}</span>
                </li>
                <li className="flex items-center" onClick={handlecommenticon}>
                  <CommentIcon className="md:w-10 w-6 md:h-10 cursor-pointer" />
                </li>
                <li className="flex items-center">
                  {isSaved ? (
                    <BookmarkOutlinedIcon
                      className="md:w-10 w-6 md:h-10 cursor-pointer"
                      color="primary"
                      onClick={HandleSave}
                    />
                  ) : (
                    <BookmarkAddIcon
                      className="md:w-10 w-6 md:h-10 cursor-pointer"
                      onClick={HandleSave}
                    />
                  )}
                </li>
                <li className="flex items-center">
                  <IosShareIcon
                    className="md:w-10 w-6 md:h-10 cursor-pointer"
                    onClick={handleShare}
                  />
                </li>
                <li className="flex items-center relative">
                  <Menu
                    open={isMenuOpen}
                    handler={setIsMenuOpen}
                    placement="bottom-end"
                  >
                    <MenuHandler>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                      >
                        <MoreHorizIcon className="md:w-10 w-6 md:h-10 cursor-pointer" />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1">
                      {isAuthor ? (
                        <div>
                          <MenuItem
                            className="flex items-center gap-2 rounded"
                            onClick={handleEdit}
                          >
                            {" "}
                            <SettingsIcon className="h-4 w-4" />
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color="inherit"
                            >
                              Edit Blog
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            onClick={handleOpenDeleteModal}
                          >
                            {" "}
                            <DeleteIcon className="h-4 w-4 text-red-500" />
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color="red"
                            >
                              Delete Blog
                            </Typography>
                          </MenuItem>
                          <MenuItem className="flex items-center gap-2 rounded">
                            {blog.is_hide ? (
                              <>
                                <VisibilityOutlinedIcon className="h-4 w-4" />
                                <Typography
                                  as="span"
                                  variant="small"
                                  className="font-normal"
                                  color="inherit"
                                  onClick={handleOpenHideModal}
                                >
                                  Unhide Blog
                                </Typography>
                           
                              </>
                            ) : (
                              <>
                                <VisibilityOffOutlinedIcon className="h-4 w-4" />
                                <Typography
                                  as="span"
                                  variant="small"
                                  className="font-normal"
                                  color="inherit"
                                  onClick={handleOpenHideModal}
                                >
                                  Hide Blog
                                </Typography>
                            
                              </>
                            )}
                            <DeleteModal
                              isOpen={ishidemodal}
                              onClose={handleCloseHideModal}
                              onConfirm={handleHideBlog}
                              action={blog.is_hide ? "Unhide" : "Hide"}
                            />
                          </MenuItem>
                        </div>
                      ) : (
                        <MenuItem
                          className="flex items-center gap-2 rounded"
                          onClick={handleOpenReportDialog}
                        >
                          {" "}
                          <ReportIcon className="h-4 w-4" />
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal"
                            color="inherit"
                          >
                            Report Blog
                          </Typography>
                        </MenuItem>
                      )}
                    </MenuList>
                    <Report
                      open={isReportDialogOpen}
                      blog={blogId}
                      user={userinfo.id}
                      handleClose={handleCloseReportDialog}
                    />
                    <DeleteModal
                      isOpen={isDeleteModalOpen}
                      onClose={handleCloseDeleteModal}
                      onConfirm={handleDelete}
                      action="Delete"
                    />
                  </Menu>
                </li>
              </ul>
            </div>
            <hr />

            {blog.banner_img && (
              <img
                className="mb-6 rounded-lg md:ml-10 md:mr-10 lg:ml-20  mt-8 lg:w-[80%] object-cover object-center"
                src={blog.banner_img}
                alt="Banner Image"
              />
            )}
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="m-10"
            />

            <video
              className="w-[50rem] lg:ml-28 mt-20 mb-10  rounded-lg"
              controls
            >
              <source src={blog.video_post} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Card>
          <div ref={commentListRef}></div>
          <Commentlist
            blogId={blogId}
            isAuthor={isAuthor}
            blog={blog.user_id}
            sendNotification={sendNotification}
          />
          {/* <Relatedblogs user={blog.user_id} /> */}
        </>
      ) : (
        <Bloghidepage user_id={userinfo.id} author_id={blog.user_id.id} />
      )}

     
    </div>
  );
}

export default Blogdetail;
