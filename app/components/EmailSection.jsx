"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

const EmailSection = () => {
  const { theme } = useTheme();
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form submission logic here

    setEmailSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="my-12 md:my-16 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
            Let&apos;s Connect
          </h2>
          <p className="text-[#555] dark:text-[#aaa] mb-8 max-w-md">
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll try my best to get back
            to you!
          </p>
          <div className="socials flex flex-row gap-4 mb-6">
            <motion.a
              whileHover={{ y: -3 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaLinkedinIn className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTwitter className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="z-10"
        >
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                placeholder="jacob@google.com"
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                placeholder="Just saying hi"
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Let's talk about..."
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
            {emailSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-500 dark:text-green-400"
              >
                Email sent successfully!
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
