"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const { theme } = useTheme();
  const cardRef = useRef(null);

  // 3D tilt effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoother spring physics for the tilt
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Get position relative to card center (values between -1 and 1)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (-1 to 1)
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update motion values
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    // Reset to original position when mouse leaves
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card-3d card-3d h-full flex flex-col relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      whileHover={{ y: -10 }}
    >
      {/* 3D hover highlight glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gradient-start to-gradient-end dark:from-gradient-dark-start dark:to-gradient-dark-end rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>

      <div
        className="h-48 sm:h-52 md:h-56 w-full bg-cover bg-center rounded-t-lg relative overflow-hidden"
        style={{
          backgroundImage: `url(${imgUrl})`,
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
          <span className="text-white text-sm font-medium px-2 py-1 rounded bg-black/50">
            View details
          </span>
        </div>
      </div>

      <div
        className="p-4 sm:p-6 flex-grow flex flex-col bg-white dark:bg-gray-800 rounded-b-lg"
        style={{ transform: "translateZ(10px)" }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 text-3d">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
          {description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm sm:text-base text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <span>Live Demo</span>
              <FaExternalLinkAlt className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
