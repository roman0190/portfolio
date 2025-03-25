import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const MenuOverlay = ({ links, onClick }) => {
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-6 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800 flex flex-col h-screen"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex justify-between items-center mb-8">
        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-400 text-sm"
        >
          Menu
        </motion.p>

        <motion.div variants={itemVariants}></motion.div>
      </div>

      <ul className="flex flex-col items-center space-y-6 mt-4">
        {links.map((link, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            className="w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Link
              href={link.path}
              onClick={() => onClick(link.path)}
              className="block py-3 text-center text-xl font-medium text-gray-800 dark:text-gray-200 rounded hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {link.title}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Personal touch - quick links */}
      <motion.div
        variants={itemVariants}
        className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 text-center"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Quick links:
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/roman0190"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
          >
            GitHub
          </a>
          <a
            href="mailto:romanhowladar841@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
          >
            Email
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-sm"
          >
            Resume
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuOverlay;
