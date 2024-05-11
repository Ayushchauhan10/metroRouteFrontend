import React, { useState } from 'react';
import { FaTrainSubway } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [active, setActive] = useState(1)
  return (
    <div className='bg-blue-600 py-3 px-4  text-white font-mono tracking-tight flex flex-row items-center justify-center md:gap-20 gap-12 md:rounded-2xl md:mx-3 '>
       <div className='flex flex-row items-center justify-center gap-2 text-white'>
            <div className=''>
                    <FaTrainSubway className='text-[30px]'/>
            </div>
            <div className='text-[20px] font-extrabold '>
                    Delhi Metro
            </div>
        </div> 

        <div className='flex flex-row items-center justify-center gap-5 text-[20px] font-black'>
            <Link to='/'>
                <div onClick={() => { setActive(1) }} style={{ color: active === 1 ? 'red' : 'white' }}>
                    Route
                </div>
            </Link>

            <Link to='/seeMap'>
                <div onClick={() => { setActive(2) }} style={{ color: active === 2 ? 'red' : 'white' }}>
                    Map
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar