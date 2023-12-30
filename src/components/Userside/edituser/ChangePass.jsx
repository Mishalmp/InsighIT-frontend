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
    DialogBody,Input

  } from "@material-tailwind/react";
  import { toast } from "react-toastify";
import { ChangeUserPassword } from "../../../services/UserApi";
function ChangePass({ isOpen, onClose,userinfo }) {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSave =async()=>{

    if (newPassword !== confirmPassword){
      return toast.error("passwords doesn't match")
    }
    if (currentPassword.trim() && newPassword.trim() && confirmPassword.trim() ){

      try {
      
        const  response = await ChangeUserPassword({
           current_password: currentPassword,
           new_password: newPassword,
           user_id:userinfo.id,
         })
   
         toast.success("password changed succussfully")
         onClose()
       } catch (error) {
         console.error(error)
         toast.error("error")
       }

    }else{
      toast.error("fields empty")
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
              Change Password
            </Typography>

            <Typography className="-mb-2" variant="h6" >
              Current Password
            </Typography>
            <Input label="Current Password"  size="lg" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
              New Password
            </Typography>
            <Input label="New Password" name="skill" size="lg" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
            <Typography className="-mb-2" variant="h6">
              Confirm Password
            </Typography>
            <Input label="Confirm Password" name="skill" size="lg" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSave}>
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
  );
}

export default ChangePass;
