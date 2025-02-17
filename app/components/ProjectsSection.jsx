"use client";
import React, { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { animate, motion, useInView } from "framer-motion";

const ProjectsData = [
  {
    id: 10,
    title: "Twitter/X Clone(Under Development)",
    description:
      "A Twitter/X clone built using Next.js, Tailwind CSS, and Unig, with ImageKit for storing post images and videos. The project is currently under development and will include features like user authentication, real-time posts, likes, comments, and a responsive UI.",
    image: "./image/projects/12.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/twitter-x-clone.git",
    previewUrl: "https://twitter-x-clone-phi.vercel.app/",
  },
  {
    id: 0,
    title: "EduForge: Your AI Writing Assistant for Academic Excellence",
    description:
      "EduForge is designed as an intelligent platform to help students tackle academic writing effortlessly. Built with cutting-edge technologies like Next.js for dynamic page rendering, Tailwind CSS for modern, responsive design, and a PostgreSQL database for efficient data handling, EduForge is fast and user-friendly. Its AI-driven backend, powered by the OpenAI API, generates personalized writing samples across a variety of academic formats—such as paragraphs, reports, applications, and more. With a streamlined and intuitive interface featuring Ant Design components, EduForge ensures students have an easy, productive, and engaging experience.",
    image: "./image/projects/10.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/eduforge-ai",
    previewUrl: "https://eduforge-ai.vercel.app/",
  },
  {
    id: 1,
    title: "PromtIt",
    description:
      "PromtIt is a web application that generates stunning images from text prompts using the Pollinations API. Built with Next.js and styled with Ant Design, it features a user-friendly interface, real-time image generation, and downloadable visuals. With its dynamic background and modern design, PromtIt makes creative expression accessible to everyone.",
    image: "./image/projects/9.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/text-to-image-ai.git",
    previewUrl: "https://text-to-image-ai-one.vercel.app/",
  },
  {
    id: 2,
    title: "FurniFlex",
    description:
      "The FurniFlex is a E-commarce web-app with Nestjs and Tailwind Css",
    image: "./image/projects/8.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/FurniFlex-FE",
    previewUrl: "https://github.com/roman0190/FurniFlex-FE",
  },
  {
    id: 3,
    title: "Talent Trades",
    description:
      "Talent Trades aims to develop a web-based platform similar to Fiverr, facilitating transactions between service providers (sellers) and service seekers (buyers). The platform will offer features for user registration, gig creation, order placement, real-time messaging, payment processing, and moderation.",
    image: "./image/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/talent-trades-FE.git",
    previewUrl: "https://github.com/roman0190/talent-trades-FE.git",
  },
  {
    id: 4,
    title: "Chat App",
    description:
      "The Messaging Application is a real-time communication platform designed to facilitate seamless and instant messaging between users. Developed using Firebase for the backend and Next.js for the frontend, this application leverages modern web technologies to provide a responsive and feature-rich messaging experience.",
    image: "./image/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/chat-app-nextjs-firebase-.git",
    previewUrl: "https://chat-app-nextjs-firebase-ecru.vercel.app/",
  },
  {
    id: 5,
    title: "AnyTech-Clone",
    description:
      "AnyTech-Clone is a modern digital landing page built using Next.js ,TailwindCss and Framer Motion. It features smooth animations, responsive design, and optimized performance for an engaging user experience.",
    image: "./image/projects/11.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/anyTech-clone.git",
    previewUrl: "https://any-tech-clone.vercel.app/",
  },
  {
    id: 9,
    title: "File Uploader",
    description:
      "The File Uploader Web Application is a robust and user-friendly platform designed for efficient file management. Built with Next.js, this application allows users to upload, manage, and download files securely and conveniently. The application is designed with a clean and intuitive interface, making it accessible for users of all technical levels.",
    image: "./image/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/file_uploader.git",
    previewUrl: "https://file-uploader-lovat.vercel.app/",
  },

  {
    id: 6,
    title: "MAAR-ket",
    description:
      "'The Super Shop Management (MAAR-ket)' system, developed using C# and .NET, is a comprehensive tool designed to streamline shop operations. Key features include inventory management, sales tracking, a chatting system, purchase history tracking, and a cart feature, making it an efficient solution for managing retail businesses.",
    image: "./image/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 7,
    title: "Weather",
    description:
      "This is my second practice Flutter app, which focuses on displaying current weather and forecast information. The app is designed using Material Design principles and is built to work seamlessly across multiple platforms, providing a consistent and responsive user experience.",
    image: "./image/projects/6.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/roman0190/weather_app.git",
    previewUrl: "/",
  },
  {
    id: 8,
    title: "ToDo",
    description:
      "The To-Do App is a Flutter application with Firebase integration for real-time task management. It allows users to view, add, and edit tasks with due times. Tasks are synchronized across devices, ensuring your to-do list is always up-to-date",
    image: "./image/projects/7.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/roman0190/to_do_app_firebase",
    previewUrl: "https://github.com/roman0190/to_do_app_firebase",
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
