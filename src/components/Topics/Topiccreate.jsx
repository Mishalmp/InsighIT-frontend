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

function Topiccreate({isOpen,onClose,fetchTopics,onSubmit,topics}) {

    const [topic,settopic]= useState({
        topic:"",
        desc:""
    })
    const [image,setImage]=useState(null)

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };    


    const validation = (topic) => {
        if (!(topic.topic.trim()) || !(topic.desc.trim())){
            toast.error("fields cannot be empty")
          
            return false
        }
        if (!isNaN(topic.topic) || !isNaN(topic.desc) ){
            toast.error("it Should Characters")
            
            return false
        }
        if (topics.some(existingtopics => existingtopics.topic === topic.topic.trim())) {
            toast.error("already exist")
            
          return false;
      };
      return true; 
    }

    const handlesubmit = async()=>{

        if(validation(topic)){
            const formData = new FormData();
            formData.append('topic', topic.topic);
            formData.append('desc', topic.desc);
            formData.append('img', image);
            await onSubmit(formData)
            fetchTopics()
            settopic({
                topic:"",
                desc:""
            })
            toast.success("Topic Created Successfully")
            onClose()
        }else{
            console.error("error in validation")
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
              Add Topic
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Topic Name
            </Typography>
            <Input name="topic" value={topic.topic} onChange={(e) => settopic({ ...topic, topic: e.target.value })} placeholder="write Topic Name..."  />

            <textarea
              name="desc"
              value={topic.desc}
              placeholder="write desc..."
              onChange={(e) => settopic({ ...topic, desc: e.target.value })}
              
              cols="30"
              rows="2"
              
            />
             <Typography className="-mb-2" variant="h6">
              Choose Image
            </Typography>
            <div className="w-72">
              <input
            
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

export default Topiccreate;
