import React from 'react'
import Navbar2 from '../components/Navbar2'
import Image from 'next/image'
import Bg from "/public/background.png"

const page = () => {
  return (
    <div className='w-full h-[882px] '>
       <Navbar2 />
       <div className='w-[1050px] h-[742px]  ml-52 py-[112px] bg-[url("/background.png")] bg-cover'>
          <div className='w-[1048px] h-[518px] flex'>
             {/* Left section */}
              <div className='w-[600px] h-[518px] '>

              </div>

              {/* Right Section */}
               

          </div>

       </div>
    </div>
  )
}

export default page
