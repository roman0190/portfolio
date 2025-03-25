import React from "react";
import { motion } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonClasses = isSelected
    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-md"
    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${buttonClasses} text-sm sm:text-base font-medium transition-all duration-200 transform perspective-500`}
      onClick={() => onClick(name)}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {name}
    </motion.button>
  );
};

export default ProjectTag;
