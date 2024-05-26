// components/NavLink.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NavLink = ({ href, title, onClick }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link href={href} onClick={onClick} className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'>
          {title}
      </Link>
    </motion.div>
  );
};

export default NavLink;

