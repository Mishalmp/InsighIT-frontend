import React, { useState } from "react";
  import {
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,Stepper, Step
 
  } from "@material-tailwind/react";
 import Title from '../../assets/howto/title.png'
 import Topic from '../../assets/howto/topic.png'
 import Coverimg from '../../assets/howto/coverimg.png'
 import Texteditor from '../../assets/howto/texteditor.png'
 import Video from '../../assets/howto/video.png'
export function HowtowriteBlog({handleOpen,open}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
 
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <div className="h-auto mt-10">
              <Typography className="text-center text-black" variant="h5">Blog Title</Typography>
              <img src={Title} alt="Blog title" />
              <Typography className="text-black text-lg text-center">Here you can give a suitable name for your blog</Typography>
            </div>
            <div className="h-auto mt-10">
              <Typography className="text-center text-black" variant="h5">Blog Topic</Typography>
              <img src={Topic} alt="Blog Topic" />
              <Typography className="text-black text-lg text-center">Here you can select one tech topic related to your blog. </Typography>
            </div>
          </div>
        );

     
      case 1:
        return (
            <div>
            <div className="h-auto mt-10">
              <Typography className="text-center text-black" variant="h5">Cover Image</Typography>
              <img src={Coverimg} alt="Blog Image" />
              <Typography className="text-black text-lg text-center ">Choose a appropriate cover image for your blog</Typography>
            </div>
            <div className="h-auto mt-10">
              <Typography className="text-center text-black" variant="h5">Add Video</Typography>
              <img src={Video} alt="Add video" />
              <Typography className="text-black text-lg text-center">
              Choose a appropriate a video for your blog
              </Typography>
            </div>
          </div>
        );

      case 2:
        return (
            <div>
         
            <div className="h-auto mt-10">
              <Typography className="text-center text-black" variant="h5">WYSIWYG Editor</Typography>
              <img src={Texteditor} alt="WYSISYG editor" />
              <Typography className="text-black text-lg text-center">Using <span className="font-semibold">WYSIWYG Editor</span> You can create a Stylish blog. <br />
              You can include Text,Code,img,Link,Style you Text etc..
              </Typography>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
 
  return (
    <>

      <Dialog open={open} size="lg" handler={handleOpen}>
        <DialogHeader className="ml-[36%] font-bold text-2xl" >How to write Blog</DialogHeader>
        <DialogBody>
        <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step className="h-3 w-3" onClick={() => setActiveStep(0)} />
        <Step className="h-3 w-3" onClick={() => setActiveStep(1)} />
        <Step className="h-3 w-3" onClick={() => setActiveStep(2)} />
      </Stepper>
        {renderStepContent()}
      <div className="mt-10 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
         
        </DialogBody>
      
      </Dialog>

    </>
  );
}