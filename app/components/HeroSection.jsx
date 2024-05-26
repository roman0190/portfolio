"use client"
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {

  return (
    <section className='font-mono mt-4'>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className='grid grid-cols-1 sm:grid-cols-12'>
            <div className="col-span-5 place-self-center sm:-mt-20 mt-4 lg:mt-0"> 
                <div className="rounded-full bg-gray-600/10 w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] sm:w-[200px] sm:h-[200px] relative ">
                    <Image
                    src = "./image/dum.png"
                    alt ="img Not Uploaded"
                    className=" absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full w-[250px] h-[250px] lg:w-[350px] lg:h-[350px] sm:w-[200px] sm:h-[200px] object-cover "
                    width ={500}
                    height ={500}
                    />
                </div>
            </div>
            <div className="col-span-7 place-self-center text-center sm:text-left md:ml-6 sm:ml-10">
                <h1 className='text-white mb-4 text-3xl sm:text-2xl lg:text-6xl font-extrabold'>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 ">Hello, I'm{" "}</span>
                <br />
                <TypeAnimation
                    sequence={[
                        'Roman Howladar',
                        3000,
                        'Full-stack developer',
                        2000,
                    ]}
                    wrapper="span"
                    speed={1}
                    repeat={Infinity}
                />
                </h1>
                <p className='text-white/45 text-base sm:text-sm mb-6 lg:text-xl'>Hey, I'm Roman. I'm primarily a full stack developer working with technologies like NestJS, Next.js, Firebase, and pgAdmin. Currently, I'm in a learning phase, but I really enjoy development-related work and find it very fulfilling. You can learn more about me in the About section.


                </p>
                <div>
                    <button className='px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-gray-500 to-green-500  text-white hover:bg-slate-200'>Hire Me</button>
                    <button className='px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-gray-500 via-blue-500 to-green-500  hover:bg-slate-800 text-white mt-3'>
                        <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download CV</span>
                    </button>
                </div>
            </div>
        </motion.div>
    </section>
  )
}

export default HeroSection
