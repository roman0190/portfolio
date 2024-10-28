"use client";
import React, { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { animate, motion, useInView } from "framer-motion";

const ProjectsData = [
  {
    id: 0,
    title: "PromtIt",
    description:
      "PromtIt is a web application that generates stunning images from text prompts using the Korci API. Built with Next.js and styled with Ant Design, it features a user-friendly interface, real-time image generation, and downloadable visuals. With its dynamic background and modern design, PromtIt makes creative expression accessible to everyone.",
    image: "./image/projects/9.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/text-to-image-ai.git",
    previewUrl: "https://text-to-image-ai-one.vercel.app/",
  },
  {
    id: 1,
    title: "FurniFlex",
    description:
      "The FurniFlex is a E-commarce web-app with Nestjs and Tailwind Css",
    image: "./image/projects/8.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/Akij_e-commarce-webapp-FE.git",
    previewUrl: "https://github.com/roman0190/Akij_e-commarce-webapp-FE.git",
  },
  {
    id: 2,
    title: "Talent Trades",
    description:
      "Talent Trades aims to develop a web-based platform similar to Fiverr, facilitating transactions between service providers (sellers) and service seekers (buyers). The platform will offer features for user registration, gig creation, order placement, real-time messaging, payment processing, and moderation.",
    image: "./image/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/talent-trades-FE.git",
    previewUrl: "https://github.com/roman0190/talent-trades-FE.git",
  },
  {
    id: 3,
    title: "Chat App",
    description:
      "The Messaging Application is a real-time communication platform designed to facilitate seamless and instant messaging between users. Developed using Firebase for the backend and Next.js for the frontend, this application leverages modern web technologies to provide a responsive and feature-rich messaging experience.",
    image: "./image/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/chat-app-nextjs-firebase-.git",
    previewUrl: "https://chat-app-nextjs-firebase-ecru.vercel.app/",
  },
  {
    id: 4,
    title: "Portfolio",
    description:
      "I built my portfolio website using Next.js and Tailwind CSS to showcase my skills and projects in a sleek and modern way. The site features sections for Home, About, Projects, Contacts, and CV. It provides an engaging overview of my background, highlights my diverse projects, offers easy ways to get in touch, and includes a downloadable version of my CV. The design is fully responsive, ensuring a seamless experience across all devices.",
    image: "./image/projects/4.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "MAAR-ket",
    description:
      "'The Super Shop Management (MAAR-ket)' system, developed using C# and .NET, is a comprehensive tool designed to streamline shop operations. Key features include inventory management, sales tracking, a chatting system, purchase history tracking, and a cart feature, making it an efficient solution for managing retail businesses.",
    image: "./image/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Weather",
    description:
      "This is my second practice Flutter app, which focuses on displaying current weather and forecast information. The app is designed using Material Design principles and is built to work seamlessly across multiple platforms, providing a consistent and responsive user experience.",
    image: "./image/projects/6.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/roman0190/weather_app.git",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "ToDo",
    description:
      "The To-Do App is a Flutter application with Firebase integration for real-time task management. It allows users to view, add, and edit tasks with due times. Tasks are synchronized across devices, ensuring your to-do list is always up-to-date",
    image: "./image/projects/7.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/roman0190/to_do_app_firebase",
    previewUrl: "https://github.com/roman0190/to_do_app_firebase",
  },
  {
    id: 8,
    title: "File Uploader",
    description:
      "The File Uploader Web Application is a robust and user-friendly platform designed for efficient file management. Built with Next.js, this application allows users to upload, manage, and download files securely and conveniently. The application is designed with a clean and intuitive interface, making it accessible for users of all technical levels.",
    image: "./image/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/file_uploader.git",
    previewUrl: "https://file-uploader-lovat.vercel.app/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };
  const filteredProjects = ProjectsData.filter((project) =>
    project.tag.includes(tag)
  );
  return (
    <div ref={ref} className="font-mono">
      <h1 className="flex text-4xl font-semibold justify-center pb-2">
        My Projects
      </h1>
      <div className="text-white flex flex-row gap-2 justify-center items-center py-6 ">
        <ProjectTag
          onClick={handleTagChange}
          name={"All"}
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={"Web"}
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name={"Mobile"}
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul className="grid lg:grid-cols-3 gap-4 grid-cols-1  ">
        {filteredProjects.map((project, index) => (
          <motion.li
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.5, delay: index * 0.5 }}
            key={index}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsSection;
