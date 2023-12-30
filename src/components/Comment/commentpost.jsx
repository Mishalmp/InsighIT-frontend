import React from 'react'
import { Textarea, Button, IconButton,Typography } from "@material-tailwind/react";
function commentpost() {
  return (
    <div className="relative w-[32rem] mt-10 ml-[13rem] mb-24">
        <Typography className='text-lg font-semibold text-center'>Add Comments</Typography>
    <Textarea variant="static" placeholder="Your Comment" className='rounded-lg' rows={5} />
    <div className="flex w-full justify-between py-1.5">
     
      <div className="flex gap-5 ml-[50%]">
        <Button size="sm" color="red" variant="text" className="rounded-md">
          Cancel
        </Button>
        <Button size="sm" className="rounded-md">
          Post Comment
        </Button>
      </div>
    </div>
  </div>
  )
}

export default commentpost
