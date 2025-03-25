import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="text-center md:text-left mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Roman
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                .dev
              </span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-md">
              Building modern, responsive web applications with passion and
              precision.
            </p>
          </motion.div>

          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href="https://github.com/roman0190"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FaGithub className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/roman-howladar-4a576123a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FaLinkedinIn className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              href="https://twitter.com/roman_howladar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FaTwitter className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              href="mailto:romanhowladar841@gmail.com"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <FaEnvelope className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>&copy; {currentYear} Roman Howladar. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
