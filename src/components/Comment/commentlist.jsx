import React, { useEffect, useRef, useState } from "react";
// import { Button, Comment, Form, Header } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
import Userimg from "../../assets/user2img.png";
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
} from "@material-tailwind/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplyIcon from "@mui/icons-material/Reply";
//   import Commentpost from './commentpost';
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { NotificationCreate } from '../../services/UserApi';
import { CreateComment, ListComment,DeleteComment } from "../../services/BlogsApi";
import { useSelector } from "react-redux";
import { timeAgo } from "../../helpers/Timemanage";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

import ReportIcon from "@mui/icons-material/Report";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

// const { userinfo } = useSelector((state) => state.user);
const Comment = ({ comment, onReply, handleReplyClick ,onDeleteClick,isBlogAuthor,userinfo}) => (
  <div
    key={comment.id}
    className="w-[50rem] rounded-lg border-[1px] bg-gray-50 min-h-32 mb-5"
  >
    <div className="flex">
      <img
        src={comment.user.profile_img}
        className="w-12 h-12 ml-2 mt-2 rounded-lg"
        alt="user image"
      />
      <div>
        <Typography variant="h6" className="mt-3 ml-5">
          {comment.user.first_name} {comment.user.last_name}
        </Typography>
        <Typography className="-mt-1 ml-5 text-gray-500 text-sm">
          {timeAgo(comment.created_at)}
        </Typography>
      </div>
      <div className="mt-3 ml-[36rem] flex gap-4">
        
        {isBlogAuthor || userinfo.id === comment.user.id ?(
        <Menu>
          <MenuHandler>
            <MoreHorizIcon fontSize="large" className="mt-1" />
          </MenuHandler>
          <MenuList>
            

            <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" onClick={() => onDeleteClick(comment.id)}>
              {" "}
              <DeleteIcon className="h-4 w-4 text-red-500" />
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="red"
              >
                Delete Comment
              </Typography>
            </MenuItem>
                

         
          </MenuList>
        </Menu>
        ):null }
      </div>
    </div>
    <Typography className="max-w-[48rem] mt-5 ml-5">
      {comment.content}
    </Typography>
    <div className="flex ml-5 mt-5 mb-5 gap-4" onClick={handleReplyClick}>
      <ReplyIcon className="w-3 h-3 hover:cursor-pointer hover:bg-blue-gray-100 rounded-full" onClick={() => onReply(comment)} />
      <Typography className="hover:cursor-pointer" onClick={() => onReply(comment)}>
        Reply
      </Typography>
      <FavoriteIcon className="mt-1 ml-5" fontSize="small" />
    </div>
    {/* Render replies */}
    {/* {comment.replies &&
      comment.replies.map((reply) => <Reply key={reply.id} reply={reply} onDeleteClick={onDeleteClick} isBlogAuthor={isBlogAuthor} />)} */}
  </div>
);

const Reply = ({ reply }) => (
  <div className="w-[40rem] ml-24 rounded-lg border-[1px] bg-gray-100 min-h-32 mb-3">
    <div className="flex">
      <img
        src={reply.user.profile_img}
        className="w-12 h-12 ml-2 mt-2 rounded-lg"
        alt="user image"
      />
      <div>
        <Typography variant="h6" className="mt-3 ml-5">
          {reply.user.first_name} {reply.user.last_name}
        </Typography>
        <Typography className="-mt-1 ml-5 text-gray-500 text-sm">
          {timeAgo(reply.created_at)}
        </Typography>
      </div>
    </div>
    <Typography className="max-w-[48rem] mr-5 mt-5 ml-5">
      {reply.content}
    </Typography>
  </div>
);

const Commentlist = ({ blogId,isAuthor,blog,sendNotification }) => {
  const [commentContent, setcomment] = useState("");
  const { userinfo } = useSelector((state) => state.user);
  const [comments, setcomments] = useState([]);
  const [parentid,setparentid]=useState(null)
  const commentPostRef = useRef(null);
  const [parent_comment_id,setparent_comment_id]=useState(null)
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const fetchcomments = async () => {
      try {
        const response = await ListComment(blogId);
        setcomments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchcomments();
  }, [blogId,commentContent]);

  

  // Scroll to comment post section whenever comments change
  //   useEffect(() => {
  //     if (commentPostRef.current) {
  //       commentPostRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, [comments]);

  const handleSubmit = async () => {
    const values = {
      blog: blogId,
      user: userinfo.id,
      content: commentContent,
      parent_comment:parent_comment_id
    };

    const notificationMessage = `${userinfo.first_name+" "+userinfo.last_name} commented on your Blog`
    
    const noti_values={
      user:blog.id,
      text:notificationMessage,
    }
    try {
      const response = await CreateComment(values);
      console.log(response.data);
      toast.success("comment created succussfully")
      sendNotification(notificationMessage,blog.id)
      await NotificationCreate(noti_values)

      if(parentid && userinfo.id !== parentid){

        const replymessage = `${userinfo.first_name+" "+userinfo.last_name} Replied on your comment`
        sendNotification(replymessage,parentid)
        await NotificationCreate({
          user:parentid,
          text:replymessage
        })
      }

      setcomment("");
      setparent_comment_id(null)
      setparentid(null)
    } catch (error) {
      console.log(error);
      toast.error("failed to create comment")
    }
  };

  const handleReplyClick = () => {
    if (commentPostRef.current) {
      commentPostRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteClick= async (comment)=>{
    console.log(comment)

    try {
        const response=await DeleteComment(comment)
        console.log('deleted comment succussfully')
        toast.success("comment deleted succussfully")

        const updatedcomments=await ListComment(blogId)
        setcomments(updatedcomments.data)
        
    } catch (error) {
        console.error(error)
        toast.error("couldn't delete comment")
    }
  }

  return (
    <>
    <ToastContainer/>
    <Card className="ml-[14rem] w-[60rem] bg-gray-200">
      <Typography variant="h3" className="text-center mt-5">
        Comments ({comments.length})
      </Typography>
      <div className="ml-10 mt-10">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleReplyClick={handleReplyClick}
            onReply={(parentComment) =>{

              setcomment(
                `@${parentComment.user.first_name}_${parentComment.user.last_name} `
              )
              setparentid(parentComment.user.id)
              setparent_comment_id(parentComment.id)

            }
          
            }
            onDeleteClick={handleDeleteClick}
            isBlogAuthor={isAuthor}
            userinfo={userinfo}

          />
        ))}

        <div className="w-[46rem] ml-16 rounded-lg border-[1px] bg-gray-50   min-h-32 mb-5 ">
          <div className="flex">
            <img
              src={Userimg}
              className="w-12 h-12 ml-2 mt-2 rounded-lg"
              alt="user image"
            />
            <div>
              <Typography variant="h6" className="mt-3 ml-5">
                Micheal Gough
              </Typography>
              <Typography className="-mt-1 ml-5 text-gray-500 text-sm">
                Feb 8 2023
              </Typography>
            </div>
            <div className="mt-3 ml-[60%] flex gap-4 mr-5">
              <FavoriteIcon fontSize="small" className="mt-1" />
              <MoreHorizIcon fontSize="medium" className="mt-1" />
            </div>
          </div>

          <Typography className="max-w-[48rem] mr-5 mt-5 ml-5">
            @Micheal_Gough Very straight-to-point article. Really worth time
            reading. Thank you! But tools are just the instruments the UX
            designers. 
          </Typography>

          <div className="flex  ml-5 mt-5 mb-5 gap-4">
            <ReplyIcon className="w-3 h-3" />
            <Typography className="">Reply</Typography>
          </div>
        </div>
      </div>

      <div ref={commentPostRef}></div>
      <div className="relative w-[32rem] mt-10 ml-[13rem] mb-24">
        <Typography className="text-lg font-semibold text-center">
          Add Comments
        </Typography>
        <Textarea
          variant="static"
          placeholder="Your Comment"
          value={commentContent}
          className="rounded-lg bg-white"
          rows={5}
          onChange={(e) => setcomment(e.target.value)}
        />
        <div className="flex w-full justify-between py-1.5">
          <div className="flex gap-5 ml-[50%]">
            <Button size="sm" color="red" variant="text" className="rounded-md">
              Cancel
            </Button>
            <Button size="sm" className="rounded-md" onClick={handleSubmit}>
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </Card>
    </>
  );
};
export default Commentlist;
