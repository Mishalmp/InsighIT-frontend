import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
  } from "@material-tailwind/react";
  import { timeAgo } from '../../helpers/Timemanage';
  import { UpdateBlog,Reportupdate } from '../../services/BlogsApi';
import { NotificationCreate } from '../../services/UserApi';


function ReportBlogModal({ isOpen, onClose, report }) {
   const [isBlocking, setIsBlocking] = useState(false);
 
    if (!isOpen || !report) {
        return null;
      }

      const handleSubmit=async()=>{

        let notification_text='';

        if (report.blog.is_block){

            notification_text='Your Blog is Unblocked'

            
        }else{

            notification_text=`Your Blog is Blocked due to ${report.reason}`
        }

        const values={
            user:report.blog.user_id.id,
            text:notification_text,

        }
        console.log(values,'notification values');
        try {
            const updatedBlog = await UpdateBlog(report.blog.id, { is_block: !report.blog.is_block });
            // const updatereport=await Reportupdate(report.id,{is_solved:!!report.is_block})
            const notification=await NotificationCreate(values)
            console.log(notification,'norififii');

            setIsBlocking(updatedBlog.data.is_block);
            onClose()
             
          } catch (error) {
            
            console.error(error);
          }

      }
      console.log(isOpen,onClose,report,'reepoort dataaaaaa');

  return (
    <div>
         
      <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Report Details</DialogHeader>
      <DialogBody className="overflow-scroll h-[30rem]">
        <Typography className="font-normal">
          <strong>Reported By:</strong> {report.user.first_name} {report.user.last_name} <br />
          <strong>Date:</strong> {timeAgo(report.reported_at)} <br />
          <strong>Reason:</strong> {report.reason} <br />
          <strong>Blog Title:</strong> {report.blog.title} <br />
          <strong>Status:</strong> {report.is_solved ? 'Solved' : 'Not Solved'}
        </Typography>
      </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={onClose}>
            cancel
          </Button>
          {report.blog.is_block?
          (<Button variant="gradient" color="red" onClick={handleSubmit}>
            UnBlock
          </Button>)
        :(
            <Button variant="gradient" color="green" onClick={handleSubmit}>
            Block
          </Button>

        )
          }
          
        </DialogFooter>
      </Dialog>
      
    </div>
  )
}

export default ReportBlogModal
