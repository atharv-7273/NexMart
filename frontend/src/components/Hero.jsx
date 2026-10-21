import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>

      {/* LEFT SIDE (TEXT) */}
      <div className='w-full sm:w-1/2 px-10 py-14 flex flex-col justify-center gap-4 text-[#414141]'>

        {/* Top line */}
        <div className='flex items-center gap-3'>
          <p className='w-10 h-[2px] bg-[#414141]'></p>
          <p className='text-sm md:text-base'>OUR BESTSELLERS</p>
        </div>

        {/* Heading */}
        <h1 className=' prata-regular  text-4xl md:text-5xl font-light leading-tight'>
          Latest Arrivals
        </h1>

        {/* Bottom line */}
        <div className='flex items-center gap-3'>
          <p className='text-sm md:text-base'>SHOP NOW</p>
          <p className='w-10 h-[2px] bg-[#414141]'></p>
        </div>

      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className='w-full sm:w-1/2'>
        <img
          className='w-full h-full object-cover'
          src={assets.hero_img}
          alt="Hero"
        />
      </div>

    </div>
  )
}

export default Hero