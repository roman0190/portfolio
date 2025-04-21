"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  // Add sound effect for theme toggle
  const playToggleSound = () => {
    if (typeof window !== "undefined") {
      const audio = new Audio(
        theme === "dark" ? "/sounds/light-on.mp3" : "/sounds/light-off.mp3"
      );
      audio.volume = 0.2;
      audio.play().catch((err) => console.error("Audio play failed:", err));
    }
  };

  const handleToggle = () => {
    toggleTheme();
    playToggleSound();
  };

  // Spring transition for smooth animation
  const toggleVariants = {
    dark: {
      rotate: 40,
      scale: 0.9,
      backgroundColor: "#1f2937",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
      transition: { type: "spring", stiffness: 700, damping: 30 },
    },
    light: {
      rotate: 0,
      scale: 1,
      backgroundColor: "#f3f4f6",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 700, damping: 30 },
    },
  };

  // Icon variants for smoother animation
  const iconVariants = {
    dark: { opacity: 1, rotate: 0, scale: 0.8, color: "#f59e0b" },
    light: { opacity: 1, rotate: 0, scale: 0.8, color: "#3b82f6" },
  };

  return (
    <motion.button
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative w-12 h-12 sm:w-10 sm:h-10 rounded-full p-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 touch-manipulation`}
      variants={toggleVariants}
      animate={theme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full rounded-full"
        initial={false}
        animate={{
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)"
              : "radial-gradient(circle, rgba(249,250,251,1) 0%, rgba(243,244,246,1) 100%)",
        }}
        transition={{ duration: 0.2 }}
      />

      {theme === "dark" ? (
        <motion.div
          key="moon"
          variants={iconVariants}
          initial="dark"
          animate="dark"
          exit={{ opacity: 0, rotate: -180, scale: 0 }}
          style={{ zIndex: 1, transformStyle: "preserve-3d" }}
          className="text-xl sm:text-base"
        >
          <FiMoon size="100%" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          variants={iconVariants}
          initial="light"
          animate="light"
          exit={{ opacity: 0, rotate: 180, scale: 0 }}
          style={{ zIndex: 1, transformStyle: "preserve-3d" }}
          className="text-xl sm:text-base"
        >
          <FiSun size="100%" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
