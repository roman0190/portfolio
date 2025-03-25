import React from "react";
import { motion } from "framer-motion";

const TabButton = ({ active, selectTab, children, icon }) => {
  const buttonClasses = active
    ? "text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400 font-bold"
    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200";

  return (
    <motion.button
      className={`flex items-center ${buttonClasses} pb-2 transition-colors duration-200`}
      onClick={selectTab}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {icon}
      <span>{children}</span>

      {/* Active indicator */}
      {active && (
        <motion.span
          className="absolute -bottom-[2px] left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-teal-400"
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

export default TabButton;
