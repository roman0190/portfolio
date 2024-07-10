"use client"
import React, { useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { animate, motion ,useInView } from 'framer-motion'


const ProjectsData = [
  {
    id: 1,
    title: "File Uploader",
    description: "The File Uploader Web Application is a robust and user-friendly platform designed for efficient file management. Built with Next.js, this application allows users to upload, manage, and download files securely and conveniently. The application is designed with a clean and intuitive interface, making it accessible for users of all technical levels.",
    image: "./image/projects/1.png",
    tag: ["All","Web"],
    gitUrl:"https://github.com/roman0190/file_uploader.git",
    previewUrl:"https://github.com/roman0190/file_uploader.git",
  },
  {
    id: 2,
    title: "Talent Trades",
    description: "Talent Trades aims to develop a web-based platform similar to Fiverr, facilitating transactions between service providers (sellers) and service seekers (buyers). The platform will offer features for user registration, gig creation, order placement, real-time messaging, payment processing, and moderation.",
    image: "./image/projects/2.png",
    tag: ["All", "Web"],
    gitUrl:"https://github.com/roman0190/talent-trades-FE.git",
    previewUrl:"https://github.com/roman0190/talent-trades-FE.git",
    
  },
  {
    id: 3,
    title: "Chat App",
    description: "The Messaging Application is a real-time communication platform designed to facilitate seamless and instant messaging between users. Developed using Nest.js for the backend and Next.js for the frontend, this application leverages modern web technologies to provide a responsive and feature-rich messaging experience.",
    image: "./image/projects/3.png",
    tag: ["All", "Web"],
    gitUrl:"https://github.com/roman0190/Chat-app-FE-Nextjs.git",
    previewUrl:"/",
  },
  {
    id: 4,
    title: "Portfolio",
    description: "This Website Build with Nextjs and Tailwind Css",
    image: "./image/projects/4.jpg",
    tag: ["All", "Web"],
    gitUrl:"/",
    previewUrl:"/",
  },
  {
    id: 5,
    title: "MAAR-ket",
    description: "'The Super Shop Management (MAAR-ket)' system, developed using C# and .NET, is a comprehensive tool designed to streamline shop operations. Key features include inventory management, sales tracking, a chatting system, purchase history tracking, and a cart feature, making it an efficient solution for managing retail businesses.",
    image: "./image/projects/5.png",
    tag: ["All", "Web"],
    gitUrl:"/",
    previewUrl:"/",
  },
  // {
  //   id: 6,
  //   title: "Next Portfolio Website",
  //   description: "Project 6 description",
  //   image: "./image/projects/6.jpg",
  //   tag: ["All", "Mobile"],
  //   gitUrl:"/",
  //   previewUrl:"/",
  // },
  // {
  //   id: 7,
  //   title: "Next Portfolio Website",
  //   description: "Project 7 description",
  //   image: "./image/projects/7.jpg",
  //   tag: ["All", "Mobile"],
  //   gitUrl:"/",
  //   previewUrl:"/",
  // },
]

const ProjectsSection = () => {

  const[tag,setTag] = useState("All")
  const ref = useRef(null);
  const isInView = useInView(ref, {once:true})

  const cardVariants = {
    initial:{ y: 50, opacity: 0 },
    animate:{ y: 0, opacity: 1},
  }

  const handleTagChange = (newTag) =>{
    setTag(newTag)
  }
  const filteredProjects = ProjectsData.filter((project)=>
    project.tag.includes(tag)
  );
  return (
    <div ref ={ref} className='font-mono'>
      <h1 className='flex text-4xl font-semibold justify-center pb-2'>My Projects</h1>
      <div className='text-white flex flex-row gap-2 justify-center items-center py-6 '>
        <ProjectTag onClick={handleTagChange} name = {"All"} isSelected={tag==="All"} />
        <ProjectTag onClick={handleTagChange} name = {"Web"} isSelected={tag==="Web"} />
        <ProjectTag onClick={handleTagChange} name = {"Mobile"} isSelected={tag==="Mobile"} />

      </div>
      <ul className='grid lg:grid-cols-3 gap-4 grid-cols-1  '>
        {filteredProjects.map((project,index) => (
          <motion.li variants={cardVariants} initial="initial" animate={isInView ? "animate" : "initial"} transition={{duration: 0.5, delay: index*0.5}} key={index} >
            <ProjectCard key={project.id} title={project.title} description={project.description} imgUrl={project.image} gitUrl ={project.gitUrl} previewUrl = {project.previewUrl}/>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsSection
