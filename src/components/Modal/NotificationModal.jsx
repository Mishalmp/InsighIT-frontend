import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";


function NotificationModal({ buttonText, modalTitle, modalContent, onOkClick,modalHeading,buttonColor }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleOkClick = () => {
    onOkClick(); // Call the provided onOkClick function
    handleOpen(); // Close the modal
  };

  return (
    <>
      
      <Button onClick={handleOpen} color={buttonColor}>{buttonText}</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {modalTitle}
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
        
          <Typography color="red" variant="h4">
            {modalHeading}
          </Typography>
          {modalContent}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button variant="gradient" onClick={handleOkClick}>
            Ok, Got It
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default NotificationModal;
