// components/NavLink.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NavLink = ({ href, title, onClick }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, -5, 0], // Wobble effect
        color: "#ffffff",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      whileTap={{
        scale: 0.95,
        rotate: -10, // Slight rotation when tapped
        transition: {
          duration: 0.2,
        },
      }}
    >
      <Link
        href={href}
        onClick={onClick}
        className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
      >
        {title}
      </Link>
    </motion.div>
  );
};

export default NavLink;
