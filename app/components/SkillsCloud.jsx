"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import TagCloud from "TagCloud";

const SkillsCloud = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    let tagCloud;

    const skills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "TailwindCSS",
      "Git",
      "HTML5",
      "CSS3",
      "Redux",
      "REST API",
      "Firebase",
      "Framer Motion",
      "Three.js",
      "Responsive Design",
      "UX/UI",
    ];

    // Options for the TagCloud
    const options = {
      radius: 250,
      maxSpeed: "normal",
      initSpeed: "normal",
      direction: 135,
      keep: true,
      useContainerInlineStyles: false,
      containerClass: "tagcloud-container",
    };

    if (container) {
      // Clear any existing cloud before creating a new one
      if (container.children.length > 0) {
        container.innerHTML = "";
      }

      tagCloud = TagCloud(container, skills, options);
    }

    // Apply theme-based colors to the tags
    const color =
      theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
    const colorHighlight =
      theme === "dark"
        ? "linear-gradient(to right, #60a5fa, #2dd4bf)"
        : "linear-gradient(to right, #3b82f6, #14b8a6)";

    document.querySelectorAll(".tagcloud-container").forEach((cloud) => {
      cloud.style.color = color;
    });

    document
      .querySelectorAll(".tagcloud-container > .tagcloud > span")
      .forEach((tag) => {
        tag.addEventListener("mouseenter", () => {
          tag.style.background = colorHighlight;
          tag.style.WebkitBackgroundClip = "text";
          tag.style.WebkitTextFillColor = "transparent";
        });

        tag.addEventListener("mouseleave", () => {
          tag.style.background = "transparent";
          tag.style.WebkitBackgroundClip = "initial";
          tag.style.WebkitTextFillColor = "initial";
          tag.style.color = color;
        });
      });

    return () => {
      if (tagCloud) {
        tagCloud.destroy();
      }
    };
  }, [theme]);

  return (
    <motion.div
      className="w-full h-[300px] md:h-[400px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        ref={containerRef}
        className="tagcloud-container relative text-sm md:text-base font-medium"
        style={{
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </motion.div>
  );
};

export default SkillsCloud;
