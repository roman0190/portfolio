import React from "react";
import { motion } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonClasses = isSelected
    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${buttonClasses} text-sm sm:text-base font-medium transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </motion.button>
  );
};

export default ProjectTag;
