"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);

      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);

      const handleMouseEnter = (e) => {
        if (
          e.target.tagName === "A" ||
          e.target.tagName === "BUTTON" ||
          e.target.closest("a") ||
          e.target.closest("button") ||
          (e.target.hasAttribute("role") &&
            e.target.getAttribute("role") === "button")
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);

      // Add event delegation for hover state
      document.addEventListener("mouseover", handleMouseEnter);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseover", handleMouseEnter);
      };
    }
  }, []);

  if (!isVisible) return null;

  // Dynamic cursor styles based on theme
  const cursorColor =
    theme === "dark" ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)";
  const ringColor =
    theme === "dark" ? "rgba(94, 234, 212, 0.4)" : "rgba(45, 212, 191, 0.4)";

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full z-50 pointer-events-none"
        style={{
          backgroundColor: cursorColor,
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-40 pointer-events-none"
        style={{
          border: `1.5px solid ${ringColor}`,
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
};

export default CustomCursor;
