import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";

import { toast } from "react-toastify";
import { CreateCommunity } from "../../services/BlogsApi";

function AddCommunity({userinfo,isOpen,onClose,FetchCommunityposts}) {

    const [text,setText]=useState("")
    const [image,setImage]=useState(null)

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };    


      const validation = (text,image) => {
        if (!(text.trim()) || !(image)){
            toast.error("fields cannot be empty")
          
            return false
        }
        if (!isNaN(text)){
            toast.error("it Should Characters")
           
            return false
        }
   
      return true; 
    }

    const handlesubmit=async()=>{

      if (validation(text,image)){
        const formData=new FormData()
        formData.append("user",userinfo.id)
        formData.append("text",text)
        formData.append("image",image)

        try {
            
             await CreateCommunity(formData)
             toast.success("Community Post created successfully")
             FetchCommunityposts()
             onClose()
        } catch (error) {
            console.error(error);
            toast.error("failed to create community post")
        }
      }else{
        console.error("validation error")
      }

       
    }

  return (
    <div>
      <Dialog
        size="xs"
        open={isOpen}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-[30rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Community Post
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Community Post desc (Max 100 Words)
            </Typography>
            <textarea
              name="text"
              placeholder="write text..."
              value={text}
              id=""
              cols="30"
              rows="5"
              onChange={(e)=>setText(e.target.value)}
            />

            <Typography className="-mb-2" variant="h6">
              Choose Image
            </Typography>
            <div className="w-72">
              <input
              name="image"
              onChange={handleImageChange}
            //   value={formdata.image}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept="image/*" 
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handlesubmit}>
              Create
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              <Typography
                variant="small"
                color="black"
                className="ml-1 font-bold"
                 onClick={onClose}
              >
                Don't Save
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default AddCommunity;
