// components/NavLink.jsx
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const NavLink = ({ href, title, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="group relative inline-block text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        {title}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </motion.div>
  );
};

export default NavLink;
