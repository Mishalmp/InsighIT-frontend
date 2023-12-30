import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@material-tailwind/react";
import { Card, Typography, Button, Checkbox } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {
  GetBlogDetail,
  GetTopics,
  UpdateBlog,
} from "../../../services/BlogsApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../../components/Loading/Loader";
import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditorToolbar, {
  modules,
  formats,
} from "../../../helpers/EditorToolbar";

function EditBlog() {
  const location = useLocation()
  const blogId = location.state.blogId
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  const [selectTopic, setSelectTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [showImage, setShowImage] = useState(null);
  // const [ispremium, setisPremium] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [Data, setData] = useState({
    title: "",
    content: "",
    topic: "",
    banner_img: null,
    video_post: null,
    is_premium_blog: false,
  });

  useEffect(() => {
    document.title="InsighIT | EditBlog";
    fetchBlogData();
    fetchTopics();
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      const response = await GetBlogDetail(blogId);
      const BlogData = response.data;
      setData({
        title: BlogData.title,
        content: BlogData.content,
        topic: BlogData.topic.id,
        banner_img: BlogData.banner_img,
        video_post: BlogData.video_post,
        is_premium_blog: BlogData.is_premium_blog,
      });

      setShowImage(BlogData.banner_img)

      console.log(response.data, "ressssponseeeee");
    } catch (error) {
      console.error("errror ! fetching blogdata ,", error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await GetTopics();
      setTopics(response.data);
    } catch (error) {
      console.error("error! fetching topics", error);
    }
  };

  const validation = () => {
    // Check if title and value are not empty and not numbers
    if (!Data.title.trim() || !Data.content.trim() || Data.topic === '') {
      toast.error("values should not be empty");
      return false;
    }
    if (!isNaN(Data.title) || !isNaN(Data.content)){
      toast.error("Values must be characters")
      return false
    }
  
    // Check if image and video are selected
    // if (!imageFile) {
    //   toast.error("Please select an image");
    //   return false;
    // }
  
    // if (!videoFile) {
    //   toast.error("Please select a video");
    //   return false;
    // }
  
    return true;
  }

  const HandleBlogUpdate = async () => {

    if (validation()){
      handleLoading();

    const formDataToSend = new FormData();
    formDataToSend.append("title", Data.title);
    formDataToSend.append("content", Data.content);
    formDataToSend.append("topic", Data.topic);
    if (imageFile instanceof File) {
      formDataToSend.append("banner_img", imageFile);
    }

    try {
      const response = await UpdateBlog(blogId, formDataToSend);
      console.log("blog updated successfully", response.data);
      toast.success("Blog Updated Successfully!!!");
      navigate(`/User/detailblog/`,{state:{id:blogId}});
    } catch (error) {
      console.error("error while updating blog", error);
      toast.error("error occurred while updating");
    }
    }else{
      console.error("validation error")
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };



  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setShowImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(selectTopic, "select topics");
  // console.log(value,'valueeeeeeeees')
  // console.log(title,'title',selectTopic,'selectopics',imageFile,'image',videoFile,'videofile')
  return (
    <div>
      {loading && <Loader />}
      <ToastContainer />
    
      <Typography className="text-center font-semibold text-2xl -ml-24 mt-10">
        Edit Blog
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
              <span>Edit Blog</span>
            </div>
          </Breadcrumbs>
      <Card className="w-[60rem] h-auto m-10 ml-[15%] bg-gray-50">
        <div className="grid grid-cols-2">
          <div className="mt-16">
            <Typography className="text-center font-semibold ">
              Title{" "}
            </Typography>
            <div className="flex flex-col w-80 mt-2 ml-20 gap-6">
              <Input
                variant="standard"
                onChange={handleChange}
                value={Data.title}
                label="Title..."
              />
            </div>
            <div className="w-80 mt-12 mb-10 ml-20 gap-6">
              <Typography className="text-center font-semibold mb-5">
                Topic
              </Typography>
              {/* <Select
            variant="outlined"
            label="Select Version"
            value={selectTopic.topic}
            onChange={(value) => setSelectTopic(value)}
          > */}
              <select
                value={selectTopic ? selectTopic.id : ""}
                disabled="true"
                onChange={(e) =>
                  setSelectTopic(
                    topics.find((topic) => topic.id === e.target.value)
                  )
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.topic}
                  </option>
                ))}
              </select>
              {/* </Select> */}
            </div>
          </div>
          <div className="mt-16">
            <Typography className="text-center font-semibold">
              Banner Image{" "}
            </Typography>
            <div className="flex items-center justify-center mt-5 w-full mb-10">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-[25rem] h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {showImage ? (
                    <img
                      className="w-[25rem] h-40 "
                      src={showImage}
                      alt="Selected Image"
                    />
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

                  {showImage && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {showImage.name}
                    </p>
                  )}
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
        <div className="mt-5">
          <Typography className="text-center font-semibold">
            Blog Content
          </Typography>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={Data.content}
            onChange={(content) =>
              setData((prevData) => ({ ...prevData, content }))
            }
            // placeholder={"Write something awesome..."}
            className="h-[15rem] w-[80%] ml-[10%] mb-10"
            modules={modules}
            formats={formats}
          />

          {/* <ReactQuill
            theme="snow"
            className="h-[10rem] w-[80%] ml-[10%] mb-10"
            value={value}
            onChange={setValue}
            
          /> */}
        </div>

        <div className="grid grid-cols-2 ml-10">
          <div className="mt-10 mb-10">
            <Typography className="text-center font-semibold">
              Video Upload (Optional)
            </Typography>
            <input
              className="block w-[23rem] mt-5 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              accept="video/*"
              // value={Data.video_post}
              // onChange={handleVideoChange}
            />

            {/* {videoFile ? <p>{videoFile.name}</p> : ''} */}
          </div>
          {userinfo.is_premium && (
            <div className="mt-20 mb-10 ml-5  flex">
              <Checkbox value={Data.is_premium_blog} onChange={handleChange} />
              <Typography className="mt-3 ml-2">Premium Blog </Typography>
            </div>
          )}
        </div>

        <Button
          className="mt-6 mb-10 w-[60%] ml-[20%]"
          onClick={HandleBlogUpdate}
        >
          Submit Blog
        </Button>
      </Card>

 
    </div>
  );
}

export default EditBlog;
