import React from "react";
import { motion } from "framer-motion";

const TabButton = ({ active, selectTab, children, icon }) => {
  const buttonClasses = active
    ? "text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
    : "text-gray-600 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200";

  return (
    <motion.button
      onClick={selectTab}
      className={`flex items-center px-4 py-2 font-medium transition-colors duration-300 ${buttonClasses} relative`}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {/* Conditionally render icon if provided */}
      {icon && <span className="mr-1">{icon}</span>}
      
      <span>{children}</span>
      
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;
