import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,Input

  } from "@material-tailwind/react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUpdateInfo } from "../../../Redux/UserSlice";
import { toast } from "react-toastify";

function ChangeName({ isOpen, UpdateUser,userinfo,onClose }) {

    const dispatch=useDispatch()

    const [usernames,setUsernames]=useState({
        first_name:userinfo.first_name,
        last_name:userinfo.last_name,
        tag_name:userinfo.tag_name
    })

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setUsernames((prevusernames)=>({
            ...prevusernames,
            [name]:value,
        }))
    }

    const handleSaveName=async()=>{
        try {
            
            await UpdateUser(userinfo.id,usernames) 
            toast.success("Names Updated")

            dispatch(
                setUpdateInfo({
                    updatedData:{
                        userinfo:{
                            first_name: usernames.first_name,
                            last_name: usernames.last_name,
                            tag_name: usernames.tag_name
                        }
                    }
                })
            )

            onClose()
        } catch (error) {
            console.error(error)
            toast.error("failed to change names")
            
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
              Edit Name
            </Typography>

            <Typography className="-mb-2" variant="h6">
              First Name
            </Typography>
            <Input label="First Name" name="first_name" size="lg" value={usernames.first_name} onChange={handleInputChange} />
            <Typography className="-mb-2" variant="h6">
              Last Name
            </Typography>
            <Input label="Last Name" name="last_name" size="lg" value={usernames.last_name} onChange={handleInputChange}/>
            <Typography className="-mb-2" variant="h6">
              Tag Name
            </Typography>
            <Input label="Tag Name" name="tag_name" size="lg" value={usernames.tag_name} onChange={handleInputChange}/>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSaveName}>
              Save
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
  )
}

export default ChangeName
