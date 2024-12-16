"use client"
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import TabButton from './TabButton';

const TabData = [
  {
    title: "Skilles",
    id: "skills",
    content: (
      <ul className='list-disc pl-4 '>
        <li><b>Frontend:</b> TypeScript, React, Next js, Tailwind CSS, Material UI</li>
        <li><b>Backend:</b> Nest js, Express js, .Net framework with C#, Dart</li>
        <li><b>Mobile App:</b> React Native, Flutter</li>
        <li><b>DB:</b> Firebase, PostgreSQL, MySQL, MSSQL</li>
        <li><b>Tools:</b> Git, Visual Studio, VS Code, Docker, Selenium</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className='list-disc pl-4'>
        <li><b>SSC:</b> Al-Haz Aminuddin High School, Madaripur,Dhaka</li>
        <li><b>HSC:</b> Milestone College, Uttara, Dhaka</li>
        <li><b>B.Sc. in CSE:</b> American International University Bangladesh (AIUB), Dhaka</li>
      </ul>
    ),
  },
  {
    title: "Experiance",
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
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const ref = useRef(null); // Create a reference to the component
  const isInView = useInView(ref, { once: false }); // Check if it's in view

  const handleTabChange = (id) => setTab(id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0,rotate:-4.5 } : {}}
      transition={{ duration: 0.8 }}
      className='text-white mt-5 font-mono'
    >
      <div className='flex lg:flex-row flex-col gap-2 mb-10'>
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full '>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='text-white/45 lg:text-lg'>
            As a Full Stack Developer, I possess a diverse skill set that spans across both front-end and back-end development. My expertise enables me to handle all aspects of web development, from designing user interfaces to managing server-side logic and databases.
          </p>
          <div className='flex flex-row mt-8'>
            <TabButton active={tab === "skills"} selectTab={() => handleTabChange("skills")}>
              Skills
            </TabButton>
            <TabButton active={tab === "education"} selectTab={() => handleTabChange("education")}>
              Education
            </TabButton>
            <TabButton active={tab === "experiance"} selectTab={() => handleTabChange("experiance")}>
              Experiance
            </TabButton>
          </div>
          <div className='mt-8 text-white/75'>
            {TabData.find((t) => t.id === tab).content}
          </div>
        </div>
        <div className='flex justify-center lg:mt-0 lg:h-[60%] md:-mt-60 md:h-60 mt-2 '>
          <Image
            src="./image/about-img.jpeg"
            width={500}
            height={500}
            alt="No img"
            className='object-cover w-full h-full rounded-md lg:mt-14'
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
