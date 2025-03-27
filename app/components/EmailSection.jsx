"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Form submission logic would go here
      // This is a placeholder for actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEmailSubmitted(true);
      setFormData({
        email: "",
        subject: "",
        message: "",
      });

      // Reset form success message after 5 seconds
      setTimeout(() => {
        setEmailSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="my-12 md:my-16 py-8 md:py-16 relative">
      {/* Decorative 3D background elements */}
      <div className="absolute -left-20 top-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full filter blur-3xl opacity-70 z-0 animate-float"></div>
      <div
        className="absolute -right-20 bottom-0 w-80 h-80 bg-teal-400/10 dark:bg-teal-500/10 rounded-full filter blur-3xl opacity-70 z-0 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-4 text-black dark:text-white text-3d"
          >
            Let&apos;s Connect
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#555] dark:text-[#aaa] mb-8 max-w-md"
          >
            I&apos;m currently looking for new opportunities. Whether you have a
            question or just want to say hi, I&apos;ll try my best to get back
            to you!
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="socials flex flex-row gap-4 mb-6"
          >
            <motion.a
              whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
              href="https://github.com/roman0190"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
              href="https://www.linkedin.com/in/roman-howladar-4a576123a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaLinkedinIn className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
              href="https://twitter.com/roman_howladar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTwitter className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              style={{ transformStyle: "preserve-3d" }}
              href="mailto:romanhowladar841@gmail.com"
              className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <FaEnvelope className="text-xl text-gray-700 dark:text-gray-300" />
            </motion.a>
          </motion.div>

          {/* Personal Touch - Direct Contact */}
          <motion.div
            variants={itemVariants}
            className="mt-8 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700/50 shadow-sm transform transition-all hover:-translate-y-1 hover:shadow-md"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Direct Contact
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700 dark:text-gray-300">
                <FaEnvelope className="mr-2" />
                <a
                  href="mailto:romanhowladar@gmail.com"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  romanhowladar841@gmail.com
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Based in Dhaka, Bangladesh • Available for remote work worldwide
              </p>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700/50">
                <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                  "I strive to build applications that solve real problems with
                  clean, efficient code."
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="z-10"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          <div className="card-3d p-6 md:p-8 transform transition-all hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Send Me a Message
            </h3>

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
                  placeholder="name@example.com"
                  className={inputClasses}
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Let's talk about..."
                  className={inputClasses}
                  value={formData.subject}
                  onChange={handleChange}
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
                  placeholder="Your message here..."
                  className={inputClasses}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="button-3d disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {emailSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg text-green-700 dark:text-green-400 text-center"
                >
                  Thank you! Message sent successfully.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
