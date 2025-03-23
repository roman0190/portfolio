import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MenuOverlay = ({ links, onClick }) => {
  return (
    <motion.div
      className="p-4 bg-white dark:bg-[#181818] shadow-lg border-t border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ul className="flex flex-col items-center space-y-4">
        {links.map((link, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <Link
              href={link.path}
              onClick={() => onClick(link.path)}
              className="block py-2 pl-3 pr-4 text-center text-gray-800 dark:text-gray-200 rounded md:p-0 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {link.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default MenuOverlay;
