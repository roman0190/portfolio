"use client";
import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { FaCode, FaGraduationCap, FaBriefcase } from "react-icons/fa";

const TAB_DATA = [
  {
    id: "skills",
    icon: <FaCode className="text-blue-500 dark:text-blue-400 mr-2" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Frontend
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {[
              "JavaScript/TypeScript",
              "React/Next.js",
              "TailwindCSS/CSS",
              "Redux/Context API",
            ].map((skill, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Backend
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {[
              "Node.js/Express",
              "MongoDB/Mongoose",
              "Firebase/Supabase",
              "Git/GitHub",
            ].map((skill, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-2"></span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "education",
    icon: <FaGraduationCap className="text-blue-500 dark:text-blue-400 mr-2" />,
    content: (
      <div className="space-y-6">
        {[
          {
            degree: "Computer Science & Engineering",
            institution: "American Internation University - Bangladesh",
            period: "2022-Present",
            description:
              "Focusing on software development, algorithms, and web technologies. Active participant in coding competitions and tech events.",
          },
        
        ].map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 border-l-4 border-blue-500 dark:border-blue-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
          >
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
              {edu.degree}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-600 dark:text-gray-300">
                {edu.institution}
              </p>
              <span className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                {edu.period}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              {edu.description}
            </p>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "experience",
    icon: <FaBriefcase className="text-blue-500 dark:text-blue-400 mr-2" />,
    content: (
      <div className="space-y-6">
        {[
          {
            role: "Frontend Developer",
            company: "Freelance Projects",
            period: "2024-Present",
            description:
              "Developing responsive web applications for clients using React, Next.js, and TailwindCSS. Implementing modern UI/UX designs and optimizing performance.",
          },
          {
            role: "Web Developer Intern",
            company: "Local Tech Startup",
            period: "2024-2025",
            description:
              "Contributed to frontend development using React and helped with backend integrations. Collaborated in an agile team environment to deliver features on time.",
          },
        ].map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-4 border-l-4 border-teal-500 dark:border-teal-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
          >
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
              {exp.role}
            </h3>
            <div className="flex justify-between items-center mt-1">
              <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
              <span className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                {exp.period}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    ),
  },
];

const AboutSection = () => {
  const { theme } = useTheme();
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Find current tab data
  const currentTabData = TAB_DATA.find((t) => t.id === tab);

  return (
    <section id="about" className="pt-12 md:pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="md:grid md:grid-cols-12 gap-12 items-center">
          {/* Image column */}
          <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-5 mb-10 md:mb-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl blur-lg opacity-30 dark:opacity-40"></div>
              <Image
                src="./image/about-img.webp"
                alt="About me image"
                width={500}
                height={500}
                className="rounded-xl shadow-lg relative  w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full blur-xl opacity-60 dark:opacity-80 z-0"></div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-7"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Web Developer & CS Student
            </h3>
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I'm Roman, a passionate web developer and Computer Science student
              from Bangladesh. I love creating responsive and interactive web
              applications that solve real problems and deliver exceptional user
              experiences.
            </p>
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              With a strong foundation in both frontend and backend development,
              I enjoy working with modern frameworks and technologies. I'm
              constantly learning and exploring new tools to enhance my skills
              and stay updated with the latest trends in web development.
            </p>

            {/* Tab buttons */}
            <div className="flex flex-col md:flex-row gap-6 justify-start mb-8 border-b border-gray-200 dark:border-gray-700">
              {TAB_DATA.map((tabItem) => (
                <TabButton
                  key={tabItem.id}
                  selectTab={() => handleTabChange(tabItem.id)}
                  active={tab === tabItem.id}
                  icon={tabItem.icon}
                >
                  {tabItem.id.charAt(0).toUpperCase() + tabItem.id.slice(1)}
                </TabButton>
              ))}
            </div>

            {/* Tab content with animation */}
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {currentTabData.content}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
