"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import TabButton from "./TabButton";

const TabData = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-4">
        <li>
          <b>Frontend:</b> TypeScript, React, Next.js, Tailwind CSS, Material UI
        </li>
        <li>
          <b>Backend:</b> Nest.js, Express.js, .NET framework with C#, Dart
        </li>
        <li>
          <b>Mobile App:</b> React Native, Flutter
        </li>
        <li>
          <b>DB:</b> Firebase, PostgreSQL, MySQL, MSSQL
        </li>
        <li>
          <b>Tools:</b> Git, Visual Studio, VS Code, Docker, Selenium
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-4">
        <li>
          <b>SSC:</b> Al-Haz Aminuddin High School, Madaripur, Dhaka
        </li>
        <li>
          <b>HSC:</b> Milestone College, Uttara, Dhaka
        </li>
        <li>
          <b>B.Sc. in CSE:</b> American International University Bangladesh (AIUB), Dhaka
        </li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="list-disc pl-4">
        <li>Full Stack Developer</li>
        <p className="text-sm text-white/45">
          Developed four Computer Science course projects covering various topics such as web development, database management, and software engineering.
          Utilized technologies including NestJS, Next.js, Firebase, and pgAdmin to create robust and scalable applications.
          Collaborated with team members to design and implement features, ensuring project milestones were met on time.
          Conducted thorough testing and debugging to maintain high-quality code standards.
        </p>
        <li>Junior React Native Firebase App Developer</li>
        <p className="text-sm text-white/45">
          Worked as a junior developer on React Native Firebase app development projects.
        </p>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  const handleTabChange = (id) => setTab(id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: -4.5 } : {}}
      transition={{ duration: 0.8 }}
      className="text-white mt-10 font-mono"
    >
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Text Section */}
        <div className="flex-1 text-left">
          <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
          <p className="text-white/70 lg:text-lg mb-8">
            As a Full Stack Developer, I possess a diverse skill set that spans across both front-end and back-end development. My expertise enables me to handle all aspects of web development, from designing user interfaces to managing server-side logic and databases.
          </p>

          <div className="flex gap-4 mb-6">
            {TabData.map((tabData) => (
              <TabButton
                key={tabData.id}
                active={tab === tabData.id}
                selectTab={() => handleTabChange(tabData.id)}
              >
                {tabData.title}
              </TabButton>
            ))}
          </div>

          <div className="text-white/75">
            {TabData.find((t) => t.id === tab)?.content}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src="/image/about-img.webp"  // Change to WebP format if available
            width={500}
            height={500}
            alt="Profile Image"
            className="object-cover w-full h-full rounded-md shadow-lg"
            priority // Preload this image as it's above the fold
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px" // Responsively load different sizes
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;
