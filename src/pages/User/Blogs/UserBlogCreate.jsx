import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@material-tailwind/react";
import { Card, Typography, Button, Checkbox } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { CreateBlog, GetTopics } from "../../../services/BlogsApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../../components/Loading/Loader";
import { UploadfileGif } from "../../../components/Loading/UploadfileGif";
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import { useNavigate } from "react-router-dom";
import EditorToolbar, {
  modules,
  formats,
} from "../../../helpers/EditorToolbar";
import { HowtowriteBlog } from "../../../components/Howto/Howtowriteblog";
import { CreateContentai } from "../../../services/generativeai";

import { Breadcrumbs } from "@material-tailwind/react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

function UserBlogCreate() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [selectTopic, setSelecttopic] = useState("");
  const [topics, setTopics] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [ispremium, setisPremium] = useState(false);
  const navigate = useNavigate();
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    document.title="InsighIT | createBlog";
    FetchTopics();
  }, []);

  const FetchTopics = async () => {
    try {
      const response = await GetTopics();
      setTopics(response.data);
    } catch (error) {
      console.error("error fetching topics", error);
    }
  };

  const validation = () => {
    // Check if title and value are not empty and not numbers
    if (!title.trim() || !value.trim() || selectTopic === '') {
      toast.error("values should not be empty");
      return false;
    }
    if (!isNaN(title) || !isNaN(value)){
      toast.error("Values must be characters")
      return false
    }
  
    // Check if image and video are selected
    if (!imageFile) {
      toast.error("Please select an image");
      return false;
    }
  
    if (!videoFile) {
      toast.error("Please select a video");
      return false;
    }
  
    return true;
  }

  const handleBlogSubmit = async () => {

    if (validation()){
      handleLoading();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", value);
      formData.append("user_id", userinfo.id);
      formData.append("topic", selectTopic);
      formData.append("banner_img", imageFile);
      formData.append("video_post", videoFile);
      formData.append("is_premium_blog", ispremium);
  
      try {
        // console.log(blogvalues, "blogvalues");
        const response = await CreateBlog(formData);
  
        toast.success("Blog created successfully");
        navigate("/User/blogs");
      } catch (error) {
        console.error("error! creating blog", error);
        toast.error("error! creating blog");
      }

    }else{
      console.error("validation error")
    }
   
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const [aimodalopen, setaimodalopen] = useState(false);
  const [aitopic, setaitopic] = useState("");

  const handleaicontentsubmit = async () => {
    setaimodalopen(false)
    setLoading(true)
    if (aitopic.trim()) {
      try {
        const aitext_res = await CreateContentai({ topic: aitopic });
        const content = aitext_res.data.find((item) => item[0] === 'content');
      if (content) {
        console.log(content[1]);
        setValue(value + content[1])
      }
      
        setaitopic("")
        setLoading(false)
        
      } catch (error) {
        console.error(error);
        toast.error("Write correct topic");
      }
    } else {
      toast.error("field empty");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
    
      <Typography className="text-center font-semibold text-2xl -ml-24 mt-10">
        Write Blog
      </Typography>
      <Breadcrumbs className="ml-32 w-36 -mt-5">
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
              <span>Create Blog</span>
            </div>
          </Breadcrumbs>
      <Button
        variant="gradient"
        onClick={handleOpen}
        className="float-right mr-80 -mt-10"
      >
        How to write?
      </Button>
      <Card className="w-[60rem]  m-10 ml-[15%] bg-gray-50 shadow-2xl">

        <div className="grid grid-cols-2" >
          <div>
        <Typography className="text-center font-semibold mt-10">
          Title{" "}
        </Typography>
        <div className="flex flex-col w-[70%] ml-[15%] gap-6">
          <Input
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title..."
          />
        </div>
        <div className="w-80 mt-12 mb-10 ml-20 gap-6">
          <Typography className="text-center font-semibold">Topic</Typography>
          <Select
            variant="outlined"
            label="Select Version"
            value={selectTopic}
            onChange={(value) => setSelecttopic(value)}
          >
            {topics.map((topic) => (
              <Option key={topic.id} value={topic.id}>
                {topic.topic}
              </Option>
            ))}
          </Select>
          
        </div>
        </div>
        <div className="mt-8">
          <Typography className="text-center font-semibold">
          Banner Image{" "}
        </Typography>
        <div className="flex items-center justify-center ml-10 mt-5 w-[25rem] mb-10">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[23rem]  h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center ">
              {imageFile ? (
                <>
                  <img
                    className="w-[23rem]  h-40 mt-10 mb-4"
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected Image"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {imageFile.name}
                  </p>
                </>
              ) : (
                <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click to upload banner image
                </span>
              </p>
                </>
                
              )}
             
              {/* {imageFile && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imageFile.name}
                </p>
              )} */}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*" 
              onChange={handleImageChange}
            />
          </label>
        </div>
        </div>
        </div>

        <div>
        
          <div className="flex  ml-[26rem] mb-5 mt-10">
            <Typography className="text-center font-semibold">
              Blog Content{" "}
            </Typography>

            {/* <p className="ml-10 text-blue-800 cursor-pointer" onClick={() => setaimodalopen(true)}>
              write with ai ?
            </p> */}
            {/* <img
                src={aiicon}
                className="w-5 h-5 ml-2 hover:bg-gray-200 hover:cursor-pointer"
                alt="ai icon"
              /> */}
          </div>
          <EditorToolbar onaicontent={() => setaimodalopen(true)} />
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder={"Write something awesome..."}
            className="h-[15rem] w-[80%] ml-[10%] mb-10"
            modules={modules}
            formats={formats}
          />
        </div>
        {/* <ReactQuill
            theme="snow"
            className="h-[10rem] w-[80%] ml-[10%] mb-10"
            value={value}
            onChange={setValue}
          /> */}
        {/* <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/>; */}
        {/* </div> */}

      <div className="grid grid-cols-2 ml-10" >
        <div className="mt-10 mb-10">
          <Typography className="text-center font-semibold">
            Video Upload 
          </Typography>
          <input
            className="block w-[23rem] mt-5 text-sm ml-10 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div>
        {userinfo.is_premium && (
          <div className="mt-20 mb-10 ml-5  flex">
            <Checkbox
              defaultValue={ispremium}
              onClick={(e) => setisPremium(!ispremium)}
            />
            <Typography className="mt-3 ml-2">Premium Blog </Typography>
          </div>
        )}
        </div>
        <Button
          className="mt-6 w-[60%] mb-10 ml-[20%]"
          onClick={handleBlogSubmit}
        >
          Submit Blog
        </Button>
      </Card>
      <HowtowriteBlog handleOpen={handleOpen} open={open} />

      <Dialog open={aimodalopen} size="xs" handler={() => setaimodalopen(false)}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Write Topic 
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write something to generate
          </Typography>
          <div className="grid gap-6">
            <Textarea  value={aitopic} onChange={(e)=>setaitopic(e.target.value)} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="gray"
            onClick={() => setaimodalopen(false)}
          >
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleaicontentsubmit}>
            Submit topic
          </Button>
        </DialogFooter>
      </Dialog>

  
    </>
  );
}

export default UserBlogCreate;
