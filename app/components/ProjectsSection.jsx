"use client";
import React, { useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const ProjectsData = [
  // {
  //   id: 10,
  //   title: "Twitter/X Clone(Under Development)",
  //   description:
  //     "A Twitter/X clone built using Next.js, Tailwind CSS, and Unig, with ImageKit for storing post images and videos. The project is currently under development and will include features like user authentication, real-time posts, likes, comments, and a responsive UI.",
  //   image: "./image/projects/12.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "https://github.com/roman0190/twitter-x-clone.git",
  //   previewUrl: "https://twitter-x-clone-phi.vercel.app/",
  // },
  {
    id: 10,
    title: "Refindz",
    description:
      "Refindz is a Mobile application designed to help users find antique items. Built with React Native , it features user authentication, item listings, and a responsive design. The app allows users to create accounts, post items, and search for items.",
    image: "./image/projects/14.png",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "https://www.refindz.io/",
  },
  {
    id: 2,
    title: "FurniFlex",
    description:
      "FurniFlex is a full-stack e-commerce web app built with Next.js for the frontend and C#/.NET for the backend. It offers a fully functional, responsive shopping experience with features like product listings, user authentication, and a shopping cart.",
    image: "./image/projects/8.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/FurniFlex-FE",
    previewUrl: "https://github.com/roman0190/FurniFlex-FE",
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

  // {
  //   id: 3,
  //   title: "Talent Trades",
  //   description:
  //     "Talent Trades aims to develop a web-based platform similar to Fiverr, facilitating transactions between service providers (sellers) and service seekers (buyers). The platform will offer features for user registration, gig creation, order placement, real-time messaging, payment processing, and moderation.",
  //   image: "./image/projects/2.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "https://github.com/roman0190/talent-trades-FE.git",
  //   previewUrl: "https://github.com/roman0190/talent-trades-FE.git",
  // },
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
  // {
  //   id: 5,
  //   title: "AnyTech-Clone",
  //   description:
  //     "AnyTech-Clone is a modern digital landing page built using Next.js ,TailwindCss and Framer Motion. It features smooth animations, responsive design, and optimized performance for an engaging user experience.",
  //   image: "./image/projects/11.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "https://github.com/roman0190/anyTech-clone.git",
  //   previewUrl: "https://any-tech-clone.vercel.app/",
  // },
  {
    id: 100,
    title: "File Uploader",
    description:
      "The File Uploader Web Application is a robust and user-friendly platform designed for efficient file management. Built with Next.js, this application allows users to upload, manage, and download files securely and conveniently. The application is designed with a clean and intuitive interface, making it accessible for users of all technical levels.",
    image: "./image/projects/1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/roman0190/file_uploader.git",
    previewUrl: "https://file-uploader-lovat.vercel.app/",
  },

  // {
  //   id: 6,
  //   title: "MAAR-ket",
  //   description:
  //     "'The Super Shop Management (MAAR-ket)' system, developed using C# and .NET, is a comprehensive tool designed to streamline shop operations. Key features include inventory management, sales tracking, a chatting system, purchase history tracking, and a cart feature, making it an efficient solution for managing retail businesses.",
  //   image: "./image/projects/5.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "/",
  //   previewUrl: "/",
  // },
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
  {
    id: 9,
    title: "Open-World Game with Unity 6 (Basic)",
    description: "An open-world game built using Unity 6",
    image: "./image/projects/13.png",
    tag: ["All", "Game"],
    gitUrl: "https://github.com/roman0190/unity_open_world/nai_khuijalav o nai",
    previewUrl: "https://youtu.be/-zwNoTvkqOE",
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
    <section
      id="projects"
      className="py-8 sm:py-12 md:py-20 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 md:mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Projects
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 py-3 md:py-6 overflow-x-auto scrollbar-hide">
        <ProjectTag
          onClick={() => handleTagChange("All")}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Web")}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Mobile")}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
        <ProjectTag
          onClick={() => handleTagChange("Game")}
          name="Game"
          isSelected={tag === "Game"}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <ul
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.li
              variants={cardVariants}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              transition={{ duration: 0.5, delay: Math.min(index * 0.2, 1) }} // Cap delay for better mobile experience
              key={project.id}
              className="h-full"
            >
              <ProjectCard
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
    </section>
  );
};

export default ProjectsSection;
