import React from 'react'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
function sortorder({setSort,sort}) {
  return (
    <div className='mb-5  bg-blend-screen flex gap-4 ml-[35rem]'>

      <div className={`w-28 h-8 rounded-3xl border-[1px] cursor-pointer  border-black text-center ${sort =='latest'?"bg-gray-300":"bg-white"} `} onClick={() => setSort('latest')}>
        <p className='mt-1'>Latest</p>

      </div>
      <div className={`w-32 h-8 rounded-3xl border-[1px] cursor-pointer  border-black text-center ${sort =='popular'?"bg-gray-300":"bg-white"}`} onClick={() => setSort('popular')}>
        <p className='mt-1'>Most Popular</p>

      </div>
      <FilterListOutlinedIcon fontSize='large' />

      
    </div>
  )
}

export default sortorder
