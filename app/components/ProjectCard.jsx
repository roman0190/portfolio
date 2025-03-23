"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
      className="relative h-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 flex flex-col"
    >
      <div
        className="h-48 sm:h-52 md:h-56 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
          {description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <Link
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaGithub className="text-lg" />
            <span>Code</span>
          </Link>
          <Link
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <span>Live Demo</span>
            <FaExternalLinkAlt className="text-sm" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
