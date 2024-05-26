"use client"
import React, { useState,useTransition } from 'react'
import  Image  from 'next/image';
import TabButton from './TabButton';
const TabData = [
  {
    title : "Skilles",
    id: "skills",
    content: (
      <ul className='list-disc pl-4 '>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>NestJS</li>
        <li>Next.js</li>
        <li>Firebase</li>
        <li>pgAdmin</li>
        <li>GitHub</li>
      </ul>
    )
  },
  {
    title : "Education",
    id: "education",
    content: (
      <ul className='list-disc pl-4'>
        <li><b>SSC:</b> Al-Haz Aminuddin High School, Madaripur,Dhaka</li>
        <li><b>HSC:</b> Milestone College, Uttara, Dhaka</li>
        <li><b>B.Sc. in CSE:</b> American International University Bangladesh (AIUB), Dhaka</li>
      </ul>
    )
  },
  {
    title : "Experiance",
    id: "experiance",
    content: (
      <ul className='list-disc pl-4'>
        <li>Full Stack Developer</li>
        <p className='text-sm text-white/45'>
        Developed four Computer Science course projects covering various topics such as web development, database management, and software engineering.
        Utilized technologies including NestJS, Next.js, Firebase, and pgAdmin to create robust and scalable applications.
        Collaborated with team members to design and implement features, ensuring project milestones were met on time.
        Conducted thorough testing and debugging to maintain high-quality code standards.
        </p>
        <li>Junior React Native Firebase App Developer</li>
          <p className='text-sm text-white/45'>Worked as a junior developer on React Native Firebase app development projects.</p>
      </ul>
    )
  },
]

const AboutSection = () => {
    const[tab,setTab] = useState("skills")
    const[isPending,startTransition] = useTransition()

    const handleTabChange = (id) =>{
        startTransition(()=>{
            setTab(id)
        })
    }
  return (
    <section className='text-white mt-5 font-mono '>
      <div className='md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 '>
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
            <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
            <p className='text-white/45 lg:text-lg'>
                As a Full Stack Developer, I possess a diverse skill set that spans across both front-end and back-end development. My expertise enables me to handle all aspects of web development, from designing user interfaces to managing server-side logic and databases.
            </p>
            <div className='flex flex-row mt-8'>
            <TabButton active={tab === "skills"} selectTab={() => handleTabChange("skills")} >
                Skills
              </TabButton>
              <TabButton active={tab === "education"} selectTab={() => handleTabChange("education")} >
                Education
              </TabButton>
              <TabButton active={tab === "experiance"} selectTab={() => handleTabChange("experiance")} >
                Experiance
              </TabButton>
            </div>
            <div className='mt-8 text-white/75'>
             {TabData.find((t) =>t.id ===tab).content}
            </div>
        </div>
        <div className='flex justify-center lg:mt-0 lg:h-full md:-mt-60 md:h-60 mt-2'>
          <Image src ="/image/about-img.jpeg" width ={500} height ={500} alt="No img" className='w-full rounded-md lg:mt-14  '/>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
