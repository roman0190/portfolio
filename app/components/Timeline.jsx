"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";

const timelineItems = [
  {
    year: "2022",
    title: "Started Computer Science Degree",
    description:
      "Began my journey at American International University - Bangladesh studying Computer Science.",
    icon: <FaGraduationCap />,
    type: "education",
  },
  {
    year: "2023",
    title: "First Web Development Project",
    description:
      "Completed my first major web project using React and Node.js.",
    icon: <FaCode />,
    type: "project",
  },
  {
    year: "2023",
    title: "Freelance Developer",
    description:
      "Started taking on freelance projects to build real-world experience.",
    icon: <FaBriefcase />,
    type: "work",
  },
  {
    year: "2024",
    title: "Expanded Tech Stack",
    description:
      "Learned Next.js, TypeScript, and advanced my frontend and backend skills.",
    icon: <FaCode />,
    type: "project",
  },
  {
    year: "2024",
    title: "Web Developer Intern",
    description: "Joined a local tech startup as a web development intern.",
    icon: <FaBriefcase />,
    type: "work",
  },
];

const TimelineItem = ({ item, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;
  const bgColorClass =
    item.type === "education"
      ? "bg-blue-100 dark:bg-blue-900/30 border-blue-500"
      : item.type === "work"
      ? "bg-teal-100 dark:bg-teal-900/30 border-teal-500"
      : "bg-purple-100 dark:bg-purple-900/30 border-purple-500";

  const iconColorClass =
    item.type === "education"
      ? "text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/60"
      : item.type === "work"
      ? "text-teal-500 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/60"
      : "text-purple-500 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/60";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className={`flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-8`}
    >
      <div className="hidden md:flex w-1/2 items-center justify-center"></div>
      <div className="w-full md:w-1/2 flex">
        <div className="w-full relative">
          <div
            className={`relative shadow-md rounded-lg p-6 border-l-4 ${bgColorClass}`}
          >
            <div
              className={`absolute -left-11 w-8 h-8 rounded-full ${iconColorClass} flex items-center justify-center`}
              style={{ transform: "translateX(50%)" }}
            >
              {item.icon}
            </div>
            <div className="absolute -left-3 top-1/2 h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-400"></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <span className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-full">
                {item.year}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Journey
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-teal-400 transform -translate-x-1/2"></div>

          {/* Timeline items */}
          {timelineItems.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
