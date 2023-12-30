import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";
import { ReportBlogs } from "../../services/BlogsApi";
import { toast } from "react-toastify";

export default function Report({ open,blog,user,handleClose }) {
 
  const [reason, setReason] = useState("");


  const handleSubmit = async () => {


    try{
        if (reason.trim()){
        const response=await ReportBlogs({blog,user,reason:reason})
        console.log(response,'reporrrt')
        toast.success("Report Submitted Successfully")
        setReason("")

        }else{
            toast.warning("Reason shouldn't be empty")
        }
        

    }catch(error){
        console.error(error)

    }



    handleClose();
  };
    
 
  return (
    <>
      
    <Dialog open={open} size="xs" handler={handleClose}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Report Blog
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
            Write the Reason for Reporting.
          </Typography>
          <div className="grid gap-6">
          
           
            <Textarea value={reason} onChange={(e)=>setReason(e.target.value)} label="Message" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            Submit Report
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}