"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarOpen && !e.target.closest("nav")) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [navbarOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navbarOpen]);

  // Close menu on window resize (if desktop size is reached)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && navbarOpen) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navbarOpen]);

  const handleNavLinkClick = (path) => {
    setNavbarOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        scrolled || navbarOpen
          ? "bg-white/95 dark:bg-[#121222]/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <Link
          href={"/"}
          className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white transition-colors"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent relative"
            whileHover={{
              scale: 1.05,
              textShadow: "0px 0px 8px rgb(59 130 246 / 0.5)",
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Roman.dev
            <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-green-500 group-hover:w-full transition-all duration-300"></div>
          </motion.span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setNavbarOpen(!navbarOpen);
              }}
              className="p-1.5 sm:p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              style={{ transformStyle: "preserve-3d" }}
              aria-label={navbarOpen ? "Close menu" : "Open menu"}
            >
              {navbarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        <div className="hidden md:block w-auto">
          <motion.ul
            className="flex p-4 md:p-0 md:flex-row md:space-x-4 lg:space-x-8 mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.1,
                }}
              >
                <NavLink
                  href={link.path}
                  title={link.title}
                  onClick={() => handleNavLinkClick(link.path)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            className="md:hidden fixed top-[49px] sm:top-[56px] left-0 right-0 bottom-0 bg-white/95 dark:bg-[#121222]/95 backdrop-blur-sm z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <MenuOverlay links={navLinks} onClick={handleNavLinkClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
